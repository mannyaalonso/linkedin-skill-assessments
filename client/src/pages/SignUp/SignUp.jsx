import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import "./signup.css"

const SignUp = ({ handleUser, users }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    assesments: [],
  }

  const [formState, setFormState] = useState(initialState)
  const [helpText, setHelpText] = useState(
    <p className="account">
      Already have an account?
      <Link to={"/login"}>
        <span> Login </span>
      </Link>
    </p>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formState.name && formState.email && formState.password) {
      for (let i = 0; i < users.length; i++) {
        if (formState.email === users[i].email) {
          return setHelpText(
            <p className="account">
              That email already exists.
              <Link to={"/login"}>
                <span> Login </span>
              </Link>
            </p>
          )
        }
      }
      if (validateEmail(formState.email)) {
        if (formState.password.length > 7) {
          try {
            const res = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/users`,
              formState
            )
            setFormState(initialState)
            handleUser(res.data.user._id)
          } catch (err) {
            console.log(err)
          }
        } else {
          setHelpText(
            <p className="account">
              Please enter a password more than 7 characters.
              <Link to={"/login"}>
                <span> Login </span>
              </Link>
            </p>
          )
        }
      } else {
        setHelpText(
          <p className="account">
            Please enter a valid email.
            <Link to={"/login"}>
              <span> Login </span>
            </Link>
          </p>
        )
      }
    } else {
      setHelpText(
        <p className="account">
          Please fill out all fields.
          <Link to={"/login"}>
            <span> Login </span>
          </Link>
        </p>
      )
    }
  }

  const handleChange = (e) => {
    setHelpText(
      <p className="account">
        Already have an account?
        <Link to={"/login"}>
          <span> Login </span>
        </Link>
      </p>
    )
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  return (
    <div className="container">
      <div className="img-container">
        <div className="h1-container">
          <h1 className="img-h1">
            Pass Your <span className="title">LinkedIn</span> Assessments
          </h1>
        </div>
        <img className="img-signup"
          src="https://images.unsplash.com/photo-1606836606933-94d15b61617b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
          alt="img"
        />
      </div>
      <div className="form-container">
        <div className="form-flex-container">
          <p>Hello,</p>
          <h1>Join free today</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              value={formState.name}
              type="text"
              id="name"
            />
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              value={formState.email}
              type="text"
              id="email"
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              value={formState.password}
              type="password"
              id="password"
            />
            <button className="signup-button" type="submit">
              SEND
            </button>
            {helpText}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  }
  return false
}
