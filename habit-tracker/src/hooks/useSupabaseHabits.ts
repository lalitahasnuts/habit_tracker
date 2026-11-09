import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import type { Habit } from '../types'

interface HabitRow {
  id: string
  user_id: string
  name: string
  created_at: string
  completions: Record<string, boolean>
}

function rowToHabit(row: HabitRow): Habit {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
    completions: row.completions ?? {},
  }
}

export function useSupabaseHabits() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchHabits = async () => {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        if (!cancelled) setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .order('created_at', { ascending: true })

      if (cancelled) return

      if (error) {
        setError(error.message)
      } else if (data) {
        setHabits(data.map(rowToHabit))
      }
      setLoading(false)
    }

    fetchHabits()
    return () => { cancelled = true }
  }, [])

  //Realtime-подписка
  useEffect(() => {
    const channel = supabase
      .channel('habits-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'habits' },
        (payload) => {
          const type = payload.eventType

          if (type === 'INSERT') {
            const row = payload.new as HabitRow
            setHabits((prev) => {
              if (prev.some((h) => h.id === row.id)) return prev
              return [...prev, rowToHabit(row)]
            })
          } else if (type === 'UPDATE') {
            const row = payload.new as HabitRow
            setHabits((prev) =>
              prev.map((h) => (h.id === row.id ? rowToHabit(row) : h))
            )
          } else if (type === 'DELETE') {
            const row = payload.old as { id: string }
            setHabits((prev) => prev.filter((h) => h.id !== row.id))
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const addHabit = useCallback(async (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('habits')
      .insert([{ name: trimmed, user_id: user.id, completions: {} }])
      .select()
      .single()

    if (error) {
      setError(error.message)
      return
    }
    if (data) {
      // Realtime может прийти раньше/позже — защита от дубля есть в подписке
      setHabits((prev) => {
        if (prev.some((h) => h.id === data.id)) return prev
        return [...prev, rowToHabit(data)]
      })
    }
  }, [])

  const removeHabit = useCallback(async (id: string) => {
    const prevSnapshot = habits
    setHabits((prev) => prev.filter((h) => h.id !== id))

    const { error } = await supabase.from('habits').delete().eq('id', id)
    if (error) {
      setHabits(prevSnapshot) 
      setError(error.message)
    }
  }, [habits])

  const renameHabit = useCallback(async (id: string, name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return

    const prevSnapshot = habits
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name: trimmed } : h))
    )

    const { error } = await supabase
      .from('habits')
      .update({ name: trimmed })
      .eq('id', id)

    if (error) {
      setHabits(prevSnapshot)
      setError(error.message)
    }
  }, [habits])

  const toggleCompletion = useCallback(async (habitId: string, date: string) => {
    const habit = habits.find((h) => h.id === habitId)
    if (!habit) return

    const isDone = habit.completions[date] ?? false
    const newCompletions = { ...habit.completions, [date]: !isDone }

    const prevSnapshot = habits
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, completions: newCompletions } : h))
    )

    const { error } = await supabase
      .from('habits')
      .update({ completions: newCompletions })
      .eq('id', habitId)

    if (error) {
      setHabits(prevSnapshot)
      setError(error.message)
    }
  }, [habits])

  const replaceHabits = useCallback(async (newHabits: Habit[]) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error: delError } = await supabase
      .from('habits')
      .delete()
      .eq('user_id', user.id)
    if (delError) { setError(delError.message); return }

    const rows = newHabits.map((h) => ({
      user_id: user.id,
      name: h.name,
      completions: h.completions,
      created_at: h.createdAt,
    }))

    const { data, error } = await supabase.from('habits').insert(rows).select()
    if (error) { setError(error.message); return }

    setHabits(data.map(rowToHabit))
  }, [])

  return {
    habits,
    loading,
    error,
    addHabit,
    removeHabit,
    renameHabit,
    toggleCompletion,
    replaceHabits,
  }
}