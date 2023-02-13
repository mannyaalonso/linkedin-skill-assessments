import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"
import "./login.css"

const Login = ({ handleUser, users }) => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
    assesments: [],
  }

  const [formState, setFormState] = useState(initialState)
  const [helpText, setHelpText] = useState(
    <p className="account">
      Need an account?
      <Link to={"/"}>
        <span> Sign up </span>
      </Link>
    </p>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formState.email && formState.password) {
      for (let i = 0; i < users.length; i++) {
        if (formState.email === users[i].email && formState.password === users[i].password) {
          handleUser("login", users[i]._id)
          navigate("/")
        } else {
          setHelpText(
            <p className="account">
             Please verify email and password
              <Link to={"/"}>
                <span> Sign up </span>
              </Link>
            </p>
          )
        }
      }
    }
  }

  const handleChange = (e) => {
    setHelpText(
      <p className="account">
        Need an account?
        <Link to={"/"}>
          <span> Sign up </span>
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
        <img className="img-login"
          src="https://images.unsplash.com/photo-1606836606933-94d15b61617b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
          alt="img"
        />
      </div>
      <div className="form-container">
        <div className="form-flex-container">
          <p>Hello,</p>
          <h1>Welcome back</h1>
          <form className="form" onSubmit={handleSubmit}>
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
              LOGIN
            </button>
            {helpText}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
