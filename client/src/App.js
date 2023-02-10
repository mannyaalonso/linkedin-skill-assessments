import Assessment from "./pages/Assessment/Assessment"
import { Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import axios from "axios"
import "./App.css"

const App = () => {
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem("user"))
  const [assessments, setAssessments] = useState([])
  const [users, setUsers] = useState()

  const handleUser = (id) => {
    sessionStorage.setItem("user", id)
    setCurrentUser(id)
  }

  const getUsers = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BASE_URL}users`)
      setUsers(res.data.users)
    } catch (err) {
      console.log(err)
    }
  }

  const getAssessments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}assessments`
      )
      setAssessments(res.data.assessments)
    } catch (err) {
      console.log(err)
    }
  } 

  useEffect(() => {
    getUsers()
    getAssessments()
  }, [])

  return (
    <div>
      <main>
        <Routes>
          {currentUser ? (
            <Route
              path="/"
              element={
                <Home handleUser={handleUser} assessments={assessments} />
              }
            />
          ) : (
            <Route
              path="/"
              element={<SignUp handleUser={handleUser} users={users} />}
            />
          )}
          <Route
            path="/login"
            element={<Login handleUser={handleUser} users={users} />}
          />
          <Route path="/assessments/:id" element={<Assessment assessments={assessments} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
