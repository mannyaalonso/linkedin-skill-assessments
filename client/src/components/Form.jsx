import { useState } from "react"
import axios from "axios"
import "./form.css"

const Form = ({ handleUser }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    assesments: [],
  }

  const [formState, setFormState] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3001/api/users", formState)
    setFormState(initialState)
    handleUser(formState.email)
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
            <p className="account">
              Already have an account? <span> Login </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form
