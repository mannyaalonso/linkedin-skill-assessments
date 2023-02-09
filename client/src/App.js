import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [assesments, setAssesments] = useState([])

  const getAssessments = async () => {
    try {
      let res = await axios.get("http://localhost:3001/api/assessments")
      console.log(res.data)
      setAssesments(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAssessments()
  }, [])

  return assesments ? (
  <div className="App">
    Hello
  </div>
  ) : null
}

export default App
