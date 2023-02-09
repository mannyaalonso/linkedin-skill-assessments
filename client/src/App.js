import { Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
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
      let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
      setUsers(res.data.users)
    } catch (err) {
      console.log("Error", err)
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
            <Route path="/" element={<Home currentUser={currentUser} />} />
          ) : (
            <Route
              path="/"
              element={<SignUp handleUser={handleUser} users={users} />}
            />
          )}
            <Route path="/login" element={<Login handleUser={handleUser} users={users} />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
