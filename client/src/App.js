import Assessment from "./pages/Assessment/Assessment"
import { Route, Routes } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import { useState } from "react"
import axios from "axios"

const App = () => {
  const [user, setUser] = useState("")

  const [users, setUsers] = useState()
  const navigate = useNavigate()

  /*----------HANDLE CONDITIONAL RENDERING----------*/
  const handleUser = (action, id) => {
    console.log("ACTION", action, id)
    //getUsers()
    if (action === "delete") {
      deleteUser()
    } else if (action === "logout") {
      sessionStorage.removeItem("user")
    } else if (action === "login") {
      sessionStorage.setItem("user", id)
    } else {
      sessionStorage.setItem("user", id)
    }
    navigate("/")
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

  /*----------DELETE USER----------*/
  const deleteUser = async () => {
    try {
      await axios.delete(`/api/users/${sessionStorage.getItem("user")}`)
      sessionStorage.removeItem("user")
    } catch (err) {
      console.log(err)
    }
  }

  /*----------RENDER----------*/
  return (
    <div>
      <main>
        <Routes>
          {!user === "" ? (
            <Route path="/" element={<Home handleUser={handleUser} />} />
          ) : (
            <Route path="/" element={<Login forceRefresh={true} setUser={setUser} />} />
          )}
          <Route path="/assessments/:id" element={<Assessment />} user={user} />
        </Routes>
      </main>
    </div>
  )
}

export default App
