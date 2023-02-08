const { Schema } = require("mongoose")

const questionsSchema = new Schema(
  {
    prompt: { type: String, required: true },
    answer: { type: String, required: true },
    codeUrl: { type: String, required: false },
    grade: { type: String, required: true },
    choices: [{ type: Schema.Types.ObjectId, ref: "Choices" }],
  },
  { timestamps: true }
)

module.exports = questionsSchema
