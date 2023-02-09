const { Schema } = require("mongoose")

const assessmentsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true},
    questions: { type: Array, required: true },
  },
  { timestamps: true }
)

module.exports = assessmentsSchema
