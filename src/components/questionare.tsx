import { Evaluation } from '@/enum/evaluation'
import React, { useState } from 'react'

interface Questionary {
  title: string
  onSelect: (res: any) => void
}

export default function Questionary({ title, onSelect }: Questionary) {
  const [evaluation, setEvaluation] = useState<Evaluation | any>(
    Evaluation.Excelente,
  )

  const handleChange = (e: any) => {
    setEvaluation(e.target.value)
    onSelect(e.target.value)
  }

  return (
    <div className="bg-white p-12 w-96 max-w-full flex flex-col gap-3">
      <p>{title}</p>
      <form>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="radio"
            id="excelente"
            value={Evaluation.Excelente}
            checked={evaluation === Evaluation.Excelente}
            onChange={handleChange}
          />
          <label htmlFor="excelente">Excelente</label>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="radio"
            id="boa"
            value={Evaluation.Boa}
            checked={evaluation === Evaluation.Boa}
            onChange={handleChange}
          />
          <label htmlFor="boa">Boa</label>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="radio"
            id="regular"
            value={Evaluation.Regular}
            checked={evaluation === Evaluation.Regular}
            onChange={handleChange}
          />
          <label htmlFor="regular">Regular</label>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="radio"
            id="ruim"
            value={Evaluation.Insatisfatório}
            checked={evaluation === Evaluation.Insatisfatório}
            onChange={handleChange}
          />
          <label htmlFor="ruim">Insatisfatório</label>
        </div>
        <hr className="w-full mt-2 mb-4" />
      </form>
    </div>
  )
}
