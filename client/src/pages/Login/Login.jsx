import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import "../../index.css"

const Login = ({ handleUser}) => {
  const [users, setUsers] = useState()
  const navigate = useNavigate()

  /*----------INITIAL STATE----------*/
  const initialState = {
    email: "",
    password: "",
    assesments: [],
  }

  /*----------GET USERS----------*/
  const getUsers = async () => {
    try {
      let res = await axios.get(`/api/users`)
      setUsers(res.data.users)
    } catch (err) {
      console.log(err)
    }
  }

  /*----------FORM STATE AND HELPER TEXT----------*/
  const [formState, setFormState] = useState(initialState)
  const [helpText, setHelpText] = useState(
    <p className="account">
      Need an account?
      <Link to={"/"}>
        <span> Sign up </span>
      </Link>
    </p>
  )

  /*----------CHECK IF EMAIL AND PASSWORD MATCH FROM USERS ARRAY----------*/
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formState.email && formState.password) {
      for (let i = 0; i < users.length; i++) {
        if (
          formState.email === users[i].email &&
          formState.password === users[i].password
        ) {
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

  /*----------SET FORM STATE AND RESET HELP TEXT----------*/
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

  /*----------RUN USEEFFECT ONCE----------*/
  useEffect(() => {
    getUsers()
  })

  /*----------RENDER----------*/
  return (
    <div className="container">
      <div className="img-container">
        <div className="h1-container">
          <h1 className="img-h1">
            Pass Your <span className="title">LinkedIn</span> Assessments
          </h1>
        </div>
        <img
          className="img-signup"
          src="https://images.unsplash.com/photo-1670272506220-f8332b178148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
              type="email"
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
