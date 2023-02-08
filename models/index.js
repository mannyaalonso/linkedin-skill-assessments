const { model } = require("mongoose")
const UserSchema = require("./user")
const AssesmentsSchema = require("./assesments")
const QuestionsSchema = require("./questions")
const ChoicesSchema = require("./choices")

const User = model("User", UserSchema)
const Assesment = model("Assesments", AssesmentsSchema)
const Question = model("Questions", QuestionsSchema)
const Choice = model("Choices", ChoicesSchema)

module.exports = {
  User,
  Assesment,
  Question,
  Choice,
}
