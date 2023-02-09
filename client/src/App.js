import { Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import axios from "axios"
import "./App.css"

const App = () => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))
  const [users, setUsers] = useState()

  const handleUser = (id) => {
    localStorage.setItem('user', id)
    setCurrentUser(id)
  }

  const getUsers = async () => {
    try {
      let res = await axios.get("http://localhost:3001/api/users")
      setUsers(res.data.users)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <header></header>
      <main>
        <Routes>
          {currentUser ? (
            <Route path="/" element={<Home users={users} />} />
          ) : (
            <Route
              path="/"
              element={<SignUp handleUser={handleUser} users={users} />}
            />
          )}
        </Routes>
      </main>
    </div>
  )
}

export default App
