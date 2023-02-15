const { Schema } = require("mongoose")

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    assessments: [{ type: Schema.Types.ObjectId, ref: "Assessments", unique: true}],
  },
  { timestamps: true }
)

module.exports = usersSchema