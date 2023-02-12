import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Countdown({ countdown, userAnswers, answers, length }) {
  
  let counter = 0
  let results = 0
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === answers[i] && userAnswers[i] !== null) {
      counter++
    }
  }

  results = counter / length

  const navigate = useNavigate()
  const calculateTimeLeft = () => {
    const difference = +countdown - +new Date()
    let timeLeft = {}
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    if (timeLeft.seconds === 0) {
      navigate(`/results/${results}`)
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
  })

  return (
    timeLeft.seconds >= 0 && (
      <div className="countdown">
        <p>
          <span className="countdown">{timeLeft.minutes}</span>
          <span className="countdown">:</span>
          <span className="countdown">{timeLeft.seconds}</span>
        </p>
      </div>
    )
  )
}

export default Countdown
