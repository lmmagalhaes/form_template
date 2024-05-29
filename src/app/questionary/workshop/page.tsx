'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Questionary from '@/components/questionare'
import { Evaluation } from '@/enum/evaluation'

export default function User() {
  const [teste, setTeste] = useState([
    {
      id: 1,
      title: 'Teste',
      answer: Evaluation.Excelente,
    },
    {
      id: 2,
      title: 'Outro teste',
      answer: Evaluation.Excelente,
    },
  ])

  const onSelect = (questionary: any, answer: Evaluation) => {
    const newTeste = teste.map((currentTeste) =>
      currentTeste.id === questionary.id
        ? {
            ...currentTeste,
            answer,
          }
        : currentTeste,
    )
    setTeste(newTeste)
  }

  const handleQuestionary = async () => {
    const data = teste.map(({ id, answer }) => ({ id, evaluation: answer }))
    try {
      await axios.post(`/api/questionary`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      //   router.push(`/user/${encodeURIComponent(data.email)}`)
    } catch (error) {
      console.log('Error', { error })
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
      <div className="h-screen flex flex-col justify-center items-center bg-slate-600 px-5">
        {teste.map((questionary) => (
          <Questionary
            title={questionary.title}
            onSelect={(answer) => onSelect(questionary, answer)}
          />
        ))}

        <button className="btn btn-primary w-full" onClick={handleQuestionary}>
          Enviar
        </button>
      </div>
    </div>
  )
}
