import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./assessment.css"
import axios from "axios"

const Assessment = () => {
  const [assessment, setAssessment] = useState()

  let { id } = useParams()

  const getAssessmentById = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}assessments/${id}`
      )
      console.log(res.data.assessment.questions)
      setAssessment(res.data.assessment)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAssessmentById()
  }, [])

  return (
    assessment && (
      <div className="assess-container">
        {assessment.questions.map((questions) => (
          <div key={questions.prompt} className="quiz-card">
            <div className="quiz-question">
              <h3>{questions.prompt}</h3>
            </div>
            <div className="choices">
              {questions.choices.map((choice) => (
                <div key={choice} className="alignment">
                  <input id={questions.prompt} type="radio" name={questions.prompt} value={choice}/>
                  <label for={questions.prompt}>{choice}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  )
}

export default Assessment
