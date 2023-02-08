const { Schema } = require('mongoose')

const choicesSchema = new Schema(
  { 
    choice: [{ type: String, required: true }],
  },
  { timestamps: true }
)

module.exports = choicesSchema