import Countdown from "../../components/Countdown"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./assessment.css"
import axios from "axios"

const Assessment = ({ users }) => {
  const [assessment, setAssessment] = useState()
  const navigate = useNavigate()
  const userAnswers = []
  const answers = []
  let countdown

  const user = users.map((user) => {
    if (user._id === sessionStorage.getItem("user")) {
      return user.assessments
    }
    return []
  })

  if (assessment) {
    const today = new Date()
    countdown = AddMinutesToDate(today, assessment.questions.length * 2)
  }

  let { id } = useParams()

  const getAssessmentById = async () => {
    try {
      const res = await axios.get(
        `/api/assessments/${id}`
      )
      setAssessment(res.data.assessment)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAssessmentById()
  }, [])

  const onChange = (choice, answer, index) => {
    userAnswers[index] = choice
    answers[index] = answer
  }

  const handleExit = () => {
    navigate(`/`)
  }

  const handleSubmit = () => {
    for (let i = 0; i < assessment.questions.length; i++) {
      if (
        userAnswers[i] === null ||
        userAnswers.length !== assessment.questions.length
      ) {
        return
      }
    }

    let counter = 0
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === answers[i] && userAnswers[i] !== null) {
        counter++
      }
    }

    const results = counter / assessment.questions.length
    if (results > 0.7) {
      user[1].push(assessment._id)
      postResult()
    } 
    navigate(`/`)
  }

  const postResult = async () => {
    try {
      await axios.put(
        `/api/users/${sessionStorage.getItem(
          "user"
        )}`, {
          assessments: [...user[1]]
        }
      )
    } catch (err) {
      console.log(err)
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
            <button onClick={handleExit} className="button-profile">
              Exit
            </button>
            <div className="quiz-countdown">
              <h1 className="quiz-h1">{assessment.title} Test</h1>
              <Countdown
                handleSubmit={handleSubmit}
                countdown={countdown}
              />
            </div>
            <button onClick={handleSubmit} className="button-profile">
              Submit
            </button>
          </div>
        </header>
        <div className="quiz-container">
          {assessment.questions.map((questions, index) => (
            <div key={index} className="quiz-card">
              <div className="quiz-question">
                <h4>{questions.prompt}</h4>
              </div>
              <div className="quiz-img-container">
                {questions.codeUrl !== "" && (
                  <img
                    className="quiz-img"
                    src={questions.codeUrl}
                    alt="code"
                  />
                )}
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

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}
