import { User } from '../../models/User'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req, res) {
  const { method } = req
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
