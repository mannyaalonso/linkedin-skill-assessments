import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
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

  return user && <div>Home</div>
}

export default Home
