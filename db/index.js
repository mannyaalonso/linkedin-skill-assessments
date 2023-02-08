const mongoose = require("mongoose")

mongoose
  .connect("mongodb://127.0.0.1:27017/assesmentDatabase") // if we don't have a local database named "productsDatabase" one will be created upon a successful connection
  .then(() => {
    console.log("Successfully connected to MongoDB.")
  })
  .catch((e) => {
    console.error("Connection error", e.message)
  })
// mongoose.set('debug', true)
const db = mongoose.connection

module.exports = db
