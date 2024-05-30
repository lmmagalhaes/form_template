import { mongooseConnect } from '@/lib/mongoose'
import Cors from 'cors'
import { Talk } from '../../models/Talk'

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
    if (req.query.email) {
      res.json(await Talk.findOne({ email: req.query.email }))
    } else {
      res.json(await Talk.find())
    }
  }

  if (method === 'POST') {
    const { name, email, cpf } = req.body
    const talkDoc = await Talk.create({
      name,
      email,
      cpf,
    })
    res.json(talkDoc)
  }
}
