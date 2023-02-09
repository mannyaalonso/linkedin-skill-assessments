import { useState} from 'react'
import axios from 'axios'

const Form = ({ getIssues }) => {
const initialState = {
  name: "",
  email: "",
  password: "",
  assesments: []
}

const [formState, setFormState] = useState(initialState)

const handleSubmit = async (e) => {
  e.preventDefault()
  await axios.post("http://localhost:3001/users", formState)
  setFormState(initialState)
  //getIssues()
}

const handleChange = (e) => {
  setFormState({...formState, [e.target.id]: e.target.value})
}

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Send</button>
    </form>
  )
}

export default Form
