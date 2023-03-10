const { Schema } = require("mongoose")

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String },
    assessments: [{ type: Schema.Types.ObjectId, ref: "Assessments" }],
  },
  { timestamps: true }
)

module.exports = usersSchema