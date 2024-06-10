'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Registrar os componentes
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['Excelente', 'Boa', 'Regular', 'Insatisfatório'],
  datasets: [
    {
      label: 'Oficina',
      data: [5, 10, 3, 2], // Example data
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

const data2 = {
  labels: ['Excelente', 'Boa', 'Regular', 'Insatisfatório'],
  datasets: [
    {
      label: 'Mesa Redonda',
      data: [5, 10, 3, 2], // Example data
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

export default function BarChart() {
  return (
    <div className="flex px-10">
      <div className="w-1/2 px-3">
        <Bar data={data} />
      </div>
      <div className="w-1/2 px-3">
        <Bar data={data2} />
      </div>
    </div>
  )
}
