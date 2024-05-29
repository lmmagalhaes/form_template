import { Schema, model, models } from 'mongoose'
import { Evaluation } from '../enum/evaluation'

interface IQuestionary extends Document {
  evaluation: Evaluation
}

const QuestionarySchema: Schema = new Schema({
  evaluation: {
    type: String,
    enum: Object.values(Evaluation),
    required: true,
  },
})

export const Questionary =
  models?.Questionary || model('Questionary', QuestionarySchema)
