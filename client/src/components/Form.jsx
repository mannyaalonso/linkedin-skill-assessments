import { useState } from "react"
import axios from "axios"
import "./form.css"

const Form = ({ handleUser, users }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    assesments: [],
  }


  const [formState, setFormState] = useState(initialState)
  const [helpText, setHelplText] = useState(
    <p className="account">
      That email already exists.<span> Login </span>
    </p>
  )
  // const [passwordLength, setPasswordLength] = useState(false)
  // const [invalidEmail, setInvalidEmail] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formState.name && formState.email && formState.password) {
      for (let i = 0; i < users.length; i++) {
        if (formState.email === users[i].email) {
          console.log("Email already exists")
          //return setEmailMatch(true)
        } 
      }
      if (validateEmail(formState.email)) {
        if (formState.password > 7) {

        } else {
          console.log('Please enter a password > 7 characters')
        }
      } else {
        console.log('Please enter a valid email')
      }
    } else {
      console.log('Plase fill out all fields')
    }

    // if (formState.name && formState.email && formState.password) {

    //    if (validateEmail(formState.email)) {
    //       setInvalidEmail(true)
    //       await axios.post("http://localhost:3001/api/users", formState)
    //       setFormState(initialState)
    //       handleUser(formState.email)
    //    } else {
    //     setInvalidEmail(false)
    //     console.log("Invalid Email")
    //    }
    // }
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  return (
    <div className="container">
      <div className="img-container">
        <div className="h1-container">
          <h1 className="img-h1">
            Pass Your <span className="title">LinkedIn</span> Assesments
          </h1>
        </div>
        <img
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
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form

function validateEmail(email) {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  ) {
    return true
  }
  return false
}
