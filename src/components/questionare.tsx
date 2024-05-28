import axios from 'axios'
import React, { useState } from 'react'

interface Questionary {
  title: string
}

export default function Questionary({ title }: Questionary) {
  const [questionary, setQuestionary] = useState({
    excellente: '',
    veryGood: '',
    good: '',
    regular: '',
    bad: '',
  })

  const handleQuestionary = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { excellente, veryGood, good, regular, bad } = questionary
    const data = { excellente, veryGood, good, regular, bad }
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
      <h1>Avaliação Geral</h1>
      <p>{title}</p>
      <form
        onSubmit={handleQuestionary}
        className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3"
      >
        <div>
          <input type="radio" id="excelente" value={questionary.excellente} />
          <label htmlFor="excelente">Excelente</label>
        </div>
        <div>
          <input type="radio" id="muitoBoa" value={questionary.veryGood} />
          <label htmlFor="muitoBoa">Muito boa</label>
        </div>
        <div>
          <input type="radio" id="boa" value={questionary.good} />
          <label htmlFor="boa">Boa</label>
        </div>
        <div>
          <input type="radio" id="regular" value={questionary.regular} />
          <label htmlFor="regular">Regular</label>
        </div>
        <div>
          <input type="radio" id="ruim" value={questionary.bad} />
          <label htmlFor="ruim">Ruim</label>
        </div>
        <button className="btn btn-primary w-full" type="submit">
          Enviar
        </button>
      </form>
    </div>
  )
}
