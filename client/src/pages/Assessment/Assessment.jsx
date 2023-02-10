import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./assessment.css"
import axios from "axios"

const Assessment = () => {
  const [assessment, setAssessment] = useState()
  let userAnswers = []
  let answers = []

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

  function onChange(choice, answer, index) {
    userAnswers[index] = choice
    answers[index] = answer
  }

  function handleExit() {

  }

  function handleSubmit() {
    for (let i = 0; i < assessment.questions.length; i++) {
      if (userAnswers[i] === null || userAnswers.length !== assessment.questions.length) {
        
      }
    }
  }

  return (
    assessment && (
      <div>
        <header className="quiz-header">
          <img
            className="img-quiz"
            src="https://i.imgur.com/FHwiY8J.jpg"
            alt="header"
          />
          <div className="quiz-titles">
            <button onClick={handleExit} className="button-profile">Exit</button>
            <h1 className="quiz-h1">{assessment.title} Test</h1>
            <button onClick={handleSubmit} className="button-profile">Submit</button>
          </div>
        </header>
        <div className="quiz-container">
          {assessment.questions.map((questions, index) => (
            <div key={questions.prompt} className="quiz-card">
              <div className="quiz-question">
                <h3>{questions.prompt}</h3>
              </div>
              <div className="quiz-img-container">
                {questions.codeUrl !== "" && <img className="quiz-img" src={questions.codeUrl} alt="code" />}
              </div>
              <div className="choices">
                {questions.choices.map((choice) => (
                  <div key={choice} className="alignment">
                    <input
                      onChange={() => onChange(choice, questions.answer, index)}
                      name={questions.prompt}
                      id={questions.prompt}
                      type="radio"
                    />
                    <label htmlFor={questions.prompt}>{choice}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  )
}

export default Assessment
