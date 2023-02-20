const { Schema } = require("mongoose")

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String },
    assessments: [{ type: Schema.Types.ObjectId, ref: "Assessments" }],
    isLoggedIn: { type: Boolean, required: true },
  },
  { timestamps: true }
)

module.exports = usersSchema