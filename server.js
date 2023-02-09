const PORT = process.env.PORT || 3001
const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const db = require("./db")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", routes)

db.on("error", console.error.bind(console, "MongoDB connection error:"))
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
