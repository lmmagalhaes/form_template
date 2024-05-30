import { Schema, model, models } from 'mongoose'

const TalkSchema = new Schema({
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
    required: true,
  },
})

export const Talk = models?.Talk || model('Talk', TalkSchema)
