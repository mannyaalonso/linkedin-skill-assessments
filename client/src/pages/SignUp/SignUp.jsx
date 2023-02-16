import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import "../../index.css"

const SignUp = ({ handleUser }) => {
  const [users, setUsers] = useState()

  /*----------INITIAL STATE----------*/
  const initialState = {
    name: "",
    email: "",
    password: "",
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

  console.log(users)

  /*----------FORM STATE AND HELPER TEXT----------*/
  const [formState, setFormState] = useState(initialState)
  const [helpText, setHelpText] = useState(
    <p className="account">
      Already have an account?
      <Link to={"/login"}>
        <span> Login </span>
      </Link>
    </p>
  )

  /*----------ERROR CHECK AND CREATE USER----------*/
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
            const res = await axios.post(`/api/users`, formState)
            setFormState(initialState)
            handleUser("signup", res.data.user._id)
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

  /*----------RUN USEEFFECT ONCE----------*/
  useEffect(() => {
    getUsers()
  }, [])

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
          src="https://images.unsplash.com/photo-1670272504471-61a632484750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
              SIGN UP
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
