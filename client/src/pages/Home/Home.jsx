import { useState, useEffect } from 'react'
import axios from 'axios'
import './home.css'

const Home = ({ handleUser }) => {
  const [user, setUser] = useState()
  

  const getUserById = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${sessionStorage.getItem(
          "user"
        )}`
      )
      console.log(res.data.user)
      setUser(res.data.user)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserById()
  }, [])

  return (
    user && (
      <div className="home-container">
        <header className="header">
          <img
            className="img-main"
            src="https://i.imgur.com/FHwiY8J.jpg"
            alt="header"
          />
          <h1 className="header-h1">Welcome</h1>
        </header>
        <main className="main">
          <div className="main-container">
            <h1 className="h1-container">Assessments</h1>
            <div className="assess-container">
              <div className="card">
                <div className="headings">
                  <h3>Javascript</h3>
                  <h5>Not Passed</h5>
                </div>
                <p className="card-description">
                  JavaScript Fundamentals, Data Types, Advanced Logic, Browser
                  Integration, Objects, Network Requests, Asynchronous JS, Error
                  Handling, Prototypes and Inheritance, Code Quality
                </p>
                <button className="button-assess">Take Assessment</button>
              </div>
            </div>
          </div>
          <div className="profile">
            <h1 className="h1-container-profile">Profile</h1>
            <div className="profile-card">
              <div className="profile-title">
                <h3>Name:</h3>
                <h5>{user.name}</h5>
              </div>
              <div className="profile-title">
                <h3>Email:</h3>
                <h5>{user.email}</h5>
              </div>
              <div className="profile-title">
                <h3>Assessments Passed:</h3>
                <h5>{user.assessments.length}</h5>
              </div>
              <div className="button-container">
                <button className="button-profile">Delete Account</button>
                <button onClick={() => handleUser(null)} className="button-profile">Logout</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  )
}

export default Home
