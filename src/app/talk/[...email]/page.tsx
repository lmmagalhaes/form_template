'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import axios from 'axios'

export default function ShowUser({ params }: any) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    cpf: '',
  })
  const { email } = params
  const duration = 15 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval: any = () => {
    setInterval(function () {
      var timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      var particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }
  useEffect(() => {
    if (!email) {
      return
    }
    axios.get(`/api/talk?email=${decodeURIComponent(email)}`).then((res) => {
      setUserInfo(res.data)
    })
    interval()
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
