const { Schema } = require("mongoose")

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    assesments: [{ type: Schema.Types.ObjectId, ref: "Assesments" }],
  },
  { timestamps: true }
)

module.exports = userSchema
