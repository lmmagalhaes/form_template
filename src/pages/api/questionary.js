import { Questionary } from '../../models/Questionary'
import { mongooseConnect } from '@/lib/mongoose'
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
})

// Helper to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)

  const { method } = req

  await mongooseConnect()

  if (method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (method === 'POST') {
    const evaluations = req.body
    try {
      const questionaryDocs = await Questionary.insertMany(evaluations)
      res.status(201).json(questionaryDocs)
    } catch (error) {
      res.status(500).json({ error: 'Failed to save evaluation' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
