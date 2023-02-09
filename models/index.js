const { model } = require("mongoose")
const UsersSchema = require("./users")
const AssessmentsSchema = require("./assessments")
const QuestionsSchema = require("./questions")

const User = model("Users", UsersSchema)
const Assessment = model("Assessments", AssessmentsSchema)
const Question = model("Questions", QuestionsSchema)

module.exports = {
  User,
  Assessment,
  Question,
}
