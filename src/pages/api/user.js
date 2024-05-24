import { User } from '../../models/User'
import { mongooseConnect } from '@/lib/mongoose'
import Cors from 'cors'

// Inicializa o middleware de CORS
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: '*', // ou especifique o domínio permitido, como 'https://example.com'
})

// Helper para executar middleware de CORS
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
  // Executa o middleware de CORS
  await runMiddleware(req, res, cors)

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
