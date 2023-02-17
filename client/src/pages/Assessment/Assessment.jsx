import Countdown from "../../components/Countdown"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./assessment.css"
import axios from "axios"

const Assessment = () => {
  const [assessment, setAssessment] = useState()
  const [user, setUser] = useState({})

  const navigate = useNavigate()
  let { id } = useParams()
  const userAnswers = []
  const answers = []
  let countdown

  /*----------SETUP COUNTDOWN BASED ON ASSESSMENT QUESTION LENGTH----------*/
  if (assessment) {
    const today = new Date()
    countdown = AddMinutesToDate(today, assessment.questions.length / 20)
  }

  /*----------GET ASSESSMENT BY ID----------*/
  const getAssessmentById = async () => {
    try {
      const res = await axios.get(`/api/assessments/${id}`)
      setAssessment(res.data.assessment)
    } catch (err) {
      console.log(err)
    }
  }

  /*----------GET USER BY ID----------*/
  const getUserById = async () => {
    try {
      const res = await axios.get(
        `/api/users/${sessionStorage.getItem("user")}`
      )
      setUser(res.data.user)
    } catch (err) {
      console.log(err)
    }
  }

  /*----------RUN ON RENDER ONCE----------*/
  useEffect(() => {
    getAssessmentById()
    getUserById()
  }, [])

  /*----------KEEP TRACK OF USER ANSWER AND ACTUAL ANSWERS----------*/
  const onChange = (choice, answer, index) => {
    userAnswers[index] = choice
    answers[index] = answer
  }

  /*----------EXIT ON CLICK----------*/
  const handleExit = () => {
    navigate(`/`)
  }

  /*----------SUBMIT ON CLICK----------*/
  const handleSubmit = () => {
    postResult()
  }

  /*----------UPDATE USER ASSESSMENT ARRAY----------*/
  const postResult = async () => {
    /*----------INCREASE COUNTER WHEN USER ANSWER MATCHES ANSWER----------*/
    let counter = 0
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === answers[i] && userAnswers[i] !== null) {
        counter++
      }
    }

    /*----------IF USERS SCORES 70%+ & DOESN'T MATCH PREV ID THEN UPDATE----------*/
    const results = counter / assessment.questions.length
    if (results > 0.7) {
      for (let i = 0; i < user.assessments.length; i++) {
        if (user.assessments[i]._id === assessment._id) {
          return navigate(`/`)
        }
      }
      user.assessments.push(assessment._id)
      try {
        await axios.put(`/api/users/${sessionStorage.getItem("user")}`, {
          assessments: [...user.assessments],
        })
        navigate(`/`)
      } catch (err) {
        console.log(err)
      }
    } else {
      navigate(`/`)
    }
  }

  /*----------RENDER----------*/
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
              <Countdown postResult={postResult} countdown={countdown} />
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

 /*----------HANDY FUNCTION TO GET FUTURE TIME----------*/
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}
