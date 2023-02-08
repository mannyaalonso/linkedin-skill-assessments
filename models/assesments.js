const { Schema } = require("mongoose")

const assesmentsSchema = new Schema(
  {
    title: { type: String, required: true },
    grade: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Questions" }],
  },
  { timestamps: true }
)

module.exports = assesmentsSchema
