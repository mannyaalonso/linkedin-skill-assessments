import Assessment from "./pages/Assessment/Assessment"
import { Route, Routes } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import axios from "axios"

const App = () => {
  const [assessments, setAssessments] = useState([])
  const [users, setUsers] = useState()
  const navigate = useNavigate()

  const handleUser = (action, id) => {
    if (action === "delete") {
      deleteUser()
    } else if (action === "logout") {
      sessionStorage.removeItem("user")
    } else if (action === "login") {
      sessionStorage.setItem("user", id)
    } else {
      sessionStorage.setItem("user", id)
    }
    startApp()
    navigate("/")
  }

  const startApp = async () => {
    try {
      
      let res = await axios.get(`${process.env.REACT_APP_BASE_URL}users`)
      setUsers(res.data.users)
    } catch (err) {
      console.log(err)
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}assessments`
      )
      setAssessments(res.data.assessments)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteUser = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}users/${sessionStorage.getItem(
          "user"
        )}`
      )
      for (let i = 0; i < users.length; i++) {
        if (users[i]._id === sessionStorage.getItem("user")) {
          users.splice(i, 1)
          setUsers(users)
        }
      }
      sessionStorage.removeItem("user")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    startApp()
  }, [])

  return (
    <div>
      <main>
        <Routes>
          {sessionStorage.getItem("user") ? (
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
          <Route
            path="/assessments/:id"
            element={<Assessment users={users} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
