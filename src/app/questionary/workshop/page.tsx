'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Questionary from '@/components/questionare'

export default function User() {
  const [user, setUser] = useState({
    name: '',
    email: '',
  })
  const [dataUser, setDataUser] = useState(null)

  const router = useRouter()

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
      router.push(`/user/${encodeURIComponent(data.email)}`)
    } catch (error) {
      console.log('Error', { error })
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
      <Questionary title="Teste" />
    </div>
  )
}
