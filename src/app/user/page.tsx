'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IMaskInput } from 'react-imask'

export default function User() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    cpf: '',
    rg: '',
    whatsapp: '',
  })
  const router = useRouter()

  const handleChange = (value: string, field: string) => {
    setUser((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, cpf, rg, whatsapp } = user
    const data = { name, email, cpf, rg, whatsapp }
    try {
      await axios.post(`/api/user`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      router.push(`/user/${encodeURIComponent(data.email)}`)
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
        <h1 className="font-bold text-xl mb-4">Cadastre-se na mesa redonda</h1>
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
          mask="00.000.000-00"
          type="text"
          placeholder="RG"
          className="input input-primary w-full"
          value={user.rg}
          onAccept={(value: string) => handleChange(value, 'rg')}
        />
        <IMaskInput
          mask="000.000.000-00"
          type="text"
          placeholder="CPF"
          className="input input-primary w-full"
          value={user.cpf}
          onAccept={(value) => handleChange(value, 'cpf')}
        />
        <IMaskInput
          mask="(00) 00000-0000"
          type="text"
          placeholder="What's app"
          className="input input-primary w-full"
          value={user.whatsapp}
          onAccept={(value) => handleChange(value, 'whatsapp')}
        />
        <button className="btn btn-primary w-full" type="submit">
          Cadastro
        </button>
      </form>
    </div>
  )
}
