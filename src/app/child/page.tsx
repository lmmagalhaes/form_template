'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Child() {
  const [childName, setChildName] = useState('')

  const dados = [
    {
      name: 'Leonardo',
      link: 'https://www.youtube.com/watch?v=jt_elekCECw',
    },
    {
      name: 'Jessica',
      link: 'https://www.youtube.com/watch?v=cgjekKyN_e4',
    },
    // Adicione outros objetos conforme necessário
  ]

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    whatsapp: false,
  })
  const router = useRouter()

  const handleChange = (value: string) => {
    setChildName(value)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const childData = dados.find(
      (dado) => dado.name.toLowerCase() === childName.toLowerCase(),
    )
    if (childData) {
      window.location.href = childData.link
    } else {
      // Se o nome não for encontrado, exiba uma mensagem de erro ou tome outra ação necessária
      alert('Nome não encontrado.')
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
      <form
        className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-xl mb-4">Digite o nome do seu filho.</h1>
        <input
          type="text"
          placeholder="Nome"
          className="input input-primary w-full"
          value={childName}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button className="btn btn-primary w-full" type="submit">
          Cadastro
        </button>
      </form>
    </div>
  )
}
