'use client'
import LinearProgress from '@/components/progress'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface User {
  name: string
  email: string
  cpf: string
  rg: string
  whatsapp: string
}

export default function ListUsers() {
  const [user, setUser] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const user = await axios.get(`/api/user`)
      setUser(user.data)
      setIsLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="mx-auto px-4">
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Nome</td>
            <td>Email</td>
            <td>CPF</td>
            <td>RG</td>
            <td>What's app</td>
          </tr>
        </thead>
        <tbody>
          {user.map((e) => (
            <tr key={e.email}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.cpf}</td>
              <td>{e.rg}</td>
              <td>{e.whatsapp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <LinearProgress />}
    </div>
  )
}
