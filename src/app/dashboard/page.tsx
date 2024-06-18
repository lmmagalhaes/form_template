'use client'

import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

// Registrar os componentes
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChart() {
  const [excelente, setExcelente] = useState(0)
  const [regular, setRegular] = useState(0)
  const [insatisfatori, setInsatisfatorio] = useState(0)
  const [boa, setBoa] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    axios.get(`/api/counts/dashboard`).then((res) => {
      setExcelente(res.data[0].Excelente)
      setRegular(res.data[0].Regular)
      setInsatisfatorio(res.data[0].Boa)
      setBoa(res.data[0].Insatisfatorio)
      setIsLoading(false)
    })
  }, [])
  const data = {
    labels: ['Excelente', 'Boa', 'Regular', 'Insatisfatório'],
    datasets: [
      {
        label: 'Evento',
        data: [excelente, boa, regular, insatisfatori], // Example data
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-2/3 lg:w-1/2 p-4">
        <div className="relative h-96">
          {isLoading ? (
            <div className="skeleton w-full h-full flex justify-center items-center">
              Carregando dados ...
            </div>
          ) : (
            <Bar data={data} />
          )}
        </div>
      </div>
    </div>
  )
}
