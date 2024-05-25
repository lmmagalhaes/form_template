import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, usamos uma variável global para preservar o valor
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // Em produção, não usamos uma variável global
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
