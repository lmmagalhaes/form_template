'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ShowUser({ params }: any) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    cpf: '',
  })
  const { email } = params
  useEffect(() => {
    if (!email) {
      return
    }
    axios.get(`/api/user?email=${decodeURIComponent(email)}`).then((res) => {
      setUserInfo(res.data)
    })
  }, [email])
  return (
    <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Parabéns</h3>
        <p className="py-4">Sua inscrição foi realizada com sucesso!</p>
        <p>Dados da inscrição</p>
        <p className="py-2">Nome: {userInfo?.name}</p>
        <p className="py-2">E-mail: {userInfo?.email}</p>
        <p className="py-2">CPF: {userInfo?.cpf}</p>
      </div>
    </div>
  )
}
