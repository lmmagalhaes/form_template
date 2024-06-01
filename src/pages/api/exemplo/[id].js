import { User } from '../../../models/User'
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
    const { id } = req.query // Extract id from the query string
    if (!id) {
      res.status(400).json({ error: 'ID parameter is required' })
      return
    }
    let user = null
    if (!user && mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id)
    }

    res.json(user)
  }
}
