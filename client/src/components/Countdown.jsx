import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Countdown = ({ countdown, postResult }) => {
  const navigate = useNavigate()
  /*----------CALCULATE TOAL TIME BASED ON NUMBER OF QUESTIONS PASSED DOWN---------*/
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
      console.log("Time")
      postResult()
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  /*----------RUN USEEFFECT EVERY SECOND----------*/
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
  }, [])

  /*----------RENDER----------*/
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
