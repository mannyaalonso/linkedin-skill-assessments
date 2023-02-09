const { Schema } = require("mongoose")

const questionsSchema = new Schema(
  {
    prompt: { type: String, required: true },
    answer: { type: String, required: true },
    codeUrl: { type: String, required: false },
    choices: { type: Array, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
)

module.exports = questionsSchema