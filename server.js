const PORT = process.env.PORT || 3001
const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const db = require("./db")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", routes)
app.use(express.static(`${__dirname}/client/build`))
app.get('/*', (req, res) => {
 res.sendFile(`${__dirname}/client/build/index.html`)
})

db.on("error", console.error.bind(console, "MongoDB connection error:"))
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
