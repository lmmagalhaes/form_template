import { Schema, model, models } from 'mongoose'
import { Evaluation } from '../enum/evaluation'

interface IQuestionaryTalk extends Document {
  evaluation: Evaluation
}

const QuestionaryTalkSchema: Schema = new Schema({
  evaluation: {
    type: String,
    enum: Object.values(Evaluation),
    required: true,
  },
})

export const QuestionaryTalk =
  models?.QuestionaryTalk || model('QuestionaryTalk', QuestionaryTalkSchema)
