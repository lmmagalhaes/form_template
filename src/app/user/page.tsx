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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    whatsapp: false,
  })
  const router = useRouter()

  const handleChange = (value: string, field: string) => {
    setUser((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: false }))
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, cpf, rg, whatsapp } = user

    if (!name || !email || !whatsapp) {
      setErrors({
        name: !name,
        email: !email,
        whatsapp: !whatsapp,
      })
      return
    }
    setIsSubmitting(true)
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
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
      <form
        onSubmit={handleRegister}
        className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3"
      >
        <h1 className="font-bold text-xl mb-4">
          Cadastre-se na Jornada de Direitos Humanos na Escola Básica
        </h1>
        <input
          type="text"
          placeholder="Nome"
          className="input input-primary w-full"
          value={user.name}
          onChange={(e) => handleChange(e.target.value, 'name')}
        />
        {errors.name && (
          <span className="text-red-500 text-xs text-left w-full">
            * Nome é obrigatório.
          </span>
        )}
        <input
          type="email"
          placeholder="email"
          className="input input-primary w-full"
          value={user.email}
          onChange={(e) => handleChange(e.target.value, 'email')}
        />
        {errors.email && (
          <span className="text-red-500 text-xs text-left w-full">
            * Email é obrigatório.
          </span>
        )}
        <IMaskInput
          mask="00.000.000-00"
          type="text"
          placeholder="RG"
          className="input input-primary w-full"
          value={user.rg}
          onAccept={(value: string) => handleChange(value, 'rg')}
        />
        <span className="text-red-500 text-xs text-left w-full">
          * necessário para emissão do certificado.
        </span>
        <IMaskInput
          mask="000.000.000-00"
          type="text"
          placeholder="CPF"
          className="input input-primary w-full"
          value={user.cpf}
          onAccept={(value) => handleChange(value, 'cpf')}
        />
        <span className="text-red-500 text-xs text-left w-full">
          * necessário para emissão do certificado.
        </span>
        <IMaskInput
          mask="(00) 00000-0000"
          type="text"
          placeholder="What's app"
          className="input input-primary w-full"
          value={user.whatsapp}
          onAccept={(value) => handleChange(value, 'whatsapp')}
        />
        {errors.whatsapp && (
          <span className="text-red-500 text-xs text-left w-full">
            * Celular é obrigatório.
          </span>
        )}
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={isSubmitting}
        >
          Cadastro
        </button>
      </form>
    </div>
  )
}
