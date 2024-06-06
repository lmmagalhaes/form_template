import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: false,
  },
  rg: {
    type: String,
    required: false,
  },
  whatsapp: {
    type: String,
    required: true,
  },
})

export const User = models?.User || model('User', UserSchema)
