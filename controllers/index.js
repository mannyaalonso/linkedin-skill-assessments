const { User, Assessment } = require("../models")


const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find()
    return res.status(200).json({ assessments })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params
    const assessment = await Assessment.findById(id)
    if (assessment) {
      return res.status(200).json({ assessment })
    }
    return res.status(404).send("Assessment with the specified ID does not exists")
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(assessment)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const createUser = async (req, res) => {
  try {
    const user = await new User(req.body)
    await user.save()
    return res.status(201).json({
      user,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate("assessments")
    if (user) {
      return res.status(200).json({ user })
    }
    return res.status(404).send("User with the specified ID does not exists")
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await User.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send("User deleted")
    }
    throw new Error("User not found")
  } catch (error) {
    return res.status(501).send(error.message)
  }
}

module.exports = {
  getAllAssessments,
  getAssessmentById,
  updateAssessment,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}
