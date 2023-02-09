import { Route, Routes } from "react-router-dom"
import { useState } from 'react'
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import "./App.css"

const App = () => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))

  const handleUser = (id) => {
    localStorage.setItem('user', id)
    setCurrentUser(id)
  }

  return (
    <div>
      <header></header>
      <main>
        <Routes>
          {currentUser ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route
              path="/"
              element={<SignUp handleUser={handleUser} />}
            />
          )}
        </Routes>
      </main>
    </div>
  )
}

export default App
