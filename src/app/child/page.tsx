'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Child() {
  const [childName, setChildName] = useState('')

  const dados = [
    {
      name: 'Leonardo',
      link:
        'https://drive.google.com/file/d/1R273e2tZS3EjxyFwNx98VZ3AGxCbc8a4/view?usp=drive_link',
    },
    {
      name: 'Jessica',
      link: 'https://www.youtube.com/watch?v=cgjekKyN_e4',
    },
    {
      name: 'Noah ',
      link:
        'https:drive.google.com/file/d/1bBZh5gNhrM1r82HLACBTD2dYjcwMWETU/view?usp=drive_link',
    },
    {
      name: 'Marjorie',
      link:
        'https://drive.google.com/file/d/1Ens6tXDTBFhOYy9yelqgYHFNWVV9nAGL/view?usp=drive_link',
    },
    {
      name: 'Eduarda',
      link:
        'https://drive.google.com/file/d/1HKDpnvvXCjUr6WDk8yzdeSP-LUatFXVo/view?usp=drive_link',
    },
    {
      name: 'Izabelly',
      link:
        'https://drive.google.com/file/d/1t-GtGSEVw8ZpsJ1R9CxgChfDTBwNM8p-/view?usp=drive_link',
    },
    {
      name: 'Isabella',
      link:
        'https://drive.google.com/file/d/1ZOgBuUodwx4l3OgqupnBKlRk2jlj8yGd/view?usp=drive_link',
    },
    {
      name: 'João Henrique',
      link:
        'https://drive.google.com/file/d/1qYfMMT5ZR-yrReNOVPGa1ViCi-IueRyt/view?usp=drive_link',
    },
    {
      name: 'Davi Lucca',
      link:
        'https://drive.google.com/file/d/1YvkJsspf4DtkFb0dW0WOUI2mGmUpaWI-/view?usp=drive_link',
    },
    {
      name: 'Darlan',
      link:
        'https://drive.google.com/file/d/1CK7w0WnVtdRR_cpuWzGjomvWRYaOfkfw/view?usp=drive_link',
    },
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
