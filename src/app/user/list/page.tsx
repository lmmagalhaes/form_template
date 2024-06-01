'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface User {
  name: string
  email: string
  cpf: string
}

export default function ListUsers() {
  const [user, setUser] = useState<User[]>([])

  const fetchUser = async () => {
    try {
      const user = await axios.get(`/api/user`)
      console.log('user', user.data)
      setUser(user.data)
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
            <td>Parent category</td>
          </tr>
        </thead>
        <tbody>
          {user.map((e) => (
            <tr key={e.email}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.cpf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
