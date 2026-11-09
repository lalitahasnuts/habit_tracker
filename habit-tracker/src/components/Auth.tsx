import { useState } from 'react'
import { supabase } from '../supabaseClient'

export function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) alert(error.message)
    else if (isSignUp) alert('Проверь почту для подтверждения (если включено)')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto mt-10">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="border p-2 rounded" />
      <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required className="border p-2 rounded" />
      <button type="submit" className="bg-amber-600 text-white p-2 rounded">{isSignUp ? 'Зарегистрироваться' : 'Войти'}</button>
      <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-amber-700">
        {isSignUp ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
      </button>
    </form>
  )
}