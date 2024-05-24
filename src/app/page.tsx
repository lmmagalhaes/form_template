'use client'

import Modal from '@/components/modal'
import axios from 'axios'
import { useState } from 'react'

// const envVariable = process.env.NEXT_PUBLIC_BASE_API_URL

export default function Home() {
  const [user, setUser] = useState({
    name: '',
    email: '',
  })

  const handleChange = (value: any, field: any) => {
    setUser((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email } = user
    const data = { name, email }
    try {
      await axios.post(`/api/user`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log('Error', { error })
    }
  }
  return (
    <main>
      <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
        <form
          onSubmit={handleRegister}
          className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3"
        >
          <h1 className="font-bold text-xl mb-4">
            Faça seu cadastro na oficina
          </h1>
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
          <button className="btn btn-primary w-full" type="submit">
            Cadastro
          </button>
          <Modal isOpen={true} />
        </form>
      </div>
    </main>
  )
}
