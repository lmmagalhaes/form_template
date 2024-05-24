import { User } from '../../models/User'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req, res) {
  const { method } = req

  // Adiciona cabeçalhos de CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  await mongooseConnect()

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await User.findOne({ _id: req.query.id }))
    } else {
      res.json(await User.find())
    }
  }

  if (method === 'POST') {
    const { name, email } = req.body
    const userDoc = await User.create({
      name,
      email,
    })
    res.json(userDoc)
  }
}
