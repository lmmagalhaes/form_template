import { Questionary } from '../../../models/Questionary'
import { mongooseConnect } from '@/lib/mongoose'
import Cors from 'cors'
import mongoose from 'mongoose'

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

  if (method === 'GET') {
    const responses = []
    try {
      const evaluationCounts = await Questionary.aggregate([
        {
          $group: {
            _id: '$evaluation',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            evaluation: '$_id',
            count: 1,
          },
        },
      ])

      // Convert the array of objects into a single object with evaluation as keys
      const result = evaluationCounts.reduce((acc, curr) => {
        acc[curr.evaluation] = curr.count
        return acc
      }, {})

      responses.push(result)

      res.status(200).json(responses)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
