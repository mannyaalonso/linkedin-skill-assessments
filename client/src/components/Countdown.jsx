import { useEffect, useState } from "react"

function Countdown({ countdown }) {
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
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
  })

  return (
    <div className="countdown">
      {timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
        <p>
          <span className="countdown">{timeLeft.minutes}</span>
          <span className="countdown">:</span>
          <span className="countdown">{timeLeft.seconds}</span>
        </p>
      ) : (
        <p>Time is up 🔥</p>
      )}
    </div>
  )
}

export default Countdown
