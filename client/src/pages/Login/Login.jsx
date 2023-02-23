import jwt_decode from "jwt-decode"
import { useEffect } from "react"
import Home from "../Home/Home"
import axios from "axios"
import "../../index.css"
/*global google*/

const Login = ({ setUser }) => {

  const handleCallBackResponse = async (response) => {
    let userObject = jwt_decode(response.credential)
    try {
      const res = await axios.post(`/api/users`, {
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture,
      })
      setUser(res.data.user)
      sessionStorage.setItem("user", res.data.user._id)
      sessionStorage.setItem("name", res.data.user.name)
      sessionStorage.setItem("picture", res.data.user.picture)
    } catch (err) {
      if (err.response.status === 500) {
        try {
          let email = { email: userObject.email }
          let res = await axios.post("/api/login", email)
          if (res.data.message === "Login successful") {
            setUser(res.data.user)
            sessionStorage.setItem("user", res.data.user._id)
            sessionStorage.setItem("name", res.data.user.name)
            sessionStorage.setItem("picture", res.data.user.picture)
          }
        } catch (e) {}
      }
    }
  }

  
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallBackResponse,
    })
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    })
  }, [])

  return !sessionStorage.getItem("user") ? (
    <div className="container">
      <div className="img-container">
        <div className="h1-container">
          <h1 className="img-h1">
            Pass Your <span className="title">LinkedIn</span> Assessments
          </h1>
        </div>
        <img
          className="img-signup"
          src="https://images.unsplash.com/photo-1670272506220-f8332b178148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="img"
        />
      </div>
      <div className="form-container">
        <div className="form-flex-container">
          <p className="login">Hello,</p>
          <h1 className="login">
            Please <span>Sign In</span>
          </h1>
          <div id="signInDiv"></div>
        </div>
      </div>
    </div>
  ) : (
    <Home />
  )
  
}

export default Login
