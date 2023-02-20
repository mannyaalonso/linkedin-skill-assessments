const { Router } = require("express")
const controllers = require("../controllers")
const router = Router()

router.get("/", (req, res) => res.send("This is root!"))

router.get("/assessments", controllers.getAllAssessments)

router.get("/assessments/:id", controllers.getAssessmentById)

router.put("/assessments/:id", controllers.updateAssessment)

router.post("/users", controllers.createUser)

router.get("/users", controllers.getAllUsers)

router.get("/users/:id", controllers.getUserById)

router.put("/users/:id", controllers.updateUser)

router.delete("/users/:id", controllers.deleteUser)

router.post("/login", controllers.loginUser)

module.exports = router
