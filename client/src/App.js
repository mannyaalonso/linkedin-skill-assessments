import Assessment from "./pages/Assessment/Assessment"
import { Route, Routes } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import { useState } from "react"
import axios from "axios"

const App = () => {
  const [user, setUser] = useState("")
  const navigate = useNavigate()

  /*----------HANDLE CONDITIONAL RENDERING----------*/
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
    navigate("/")
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
