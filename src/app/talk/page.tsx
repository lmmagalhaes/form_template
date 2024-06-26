'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IMaskInput } from 'react-imask'

export default function Talk() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    cpf: '',
  })
  const router = useRouter()

  const handleChange = (value: any, field: any) => {
    setUser((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, cpf } = user
    const data = { name, email, cpf }
    try {
      await axios.post(`/api/talk`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      router.push(`/talk/${encodeURIComponent(data.email)}`)
    } catch (error) {
      console.log('Error', { error })
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
      <form
        onSubmit={handleRegister}
        className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3"
      >
        <h1 className="font-bold text-xl mb-4">Cadastre-se na oficina</h1>
        <input
          type="text"
          placeholder="Nome"
          className="input input-primary w-full"
          value={user.name}
          onChange={(e) => handleChange(e.target.value, 'name')}
        />
        <input
          type="email"
          placeholder="email"
          className="input input-primary w-full"
          value={user.email}
          onChange={(e) => handleChange(e.target.value, 'email')}
        />
        <IMaskInput
          mask="000.000.000-00"
          type="text"
          placeholder="CPF"
          className="input input-primary w-full"
          value={user.cpf}
          onAccept={(value) => handleChange(value, 'cpf')}
        />
        <button className="btn btn-primary w-full" type="submit">
          Cadastro
        </button>
      </form>
    </div>
  )
}
