import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import './home.css'

const Home = ({ handleUser, user }) => {
  const [assessments, setAssessments] = useState([])
  const [currentUser, setUser] = useState()
  const navigate = useNavigate()

  /*----------GET ASSESSMENTS----------*/
  const getAssessments = async () => {
    try {
      const res = await axios.get(`/api/assessments`)
      setAssessments(res.data.assessments)
    } catch (err) {
      console.log(err)
    }
  }

  console.log("USER2", user._id)

  /*----------GET USER BY ID----------*/
  const getUserById = async () => {
    try {
      const res = await axios.get(
        `/api/users/${user._id}`
      )
      setUser(res.data.user)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  /*----------RUN USEEFFECT ONCE----------*/
  useEffect(() => {
    getUserById()
    getAssessments()
  }, [])

  /*----------GSTART AND NAVIAGTE TO ASSESSMENT BASED ON ID----------*/
  const handleStart = (id) => {
    navigate(`/assessments/${id}`)
  }

  /*----------RENDER----------*/
  return (<div>Hello</div>)
    // assessments && (
    //   <div className="home-container">
    //     <header className="header">
    //       <img
    //         className="img-main"
    //         src="https://i.imgur.com/FHwiY8J.jpg"
    //         alt="header"
    //       />
    //       <h1 className="header-h1">Welcome</h1>
    //     </header>
    //     <main className="main">
    //       <div className="main-container">
    //         <h1 className="h1-container">Assessments</h1>
    //         <div className="assess-container">
    //           {assessments.map((assessment) => (
    //             <div key={assessment._id} className="card">
    //               <div className="headings">
    //                 <h3>
    //                   {assessment.title}
    //                   {"  "}
    //                   <span>
    //                     ({assessment.questions.length} questions)
    //                   </span>{" "}
    //                 </h3>
    //                 {currentUser.assessments.find(
    //                   (element) => element._id === assessment._id
    //                 ) ? ( //thanks john
    //                   <h5>PASSED</h5>
    //                 ) : (
    //                   <h5>NOT PASSED</h5>
    //                 )}
    //               </div>
    //               <p className="card-description">{assessment.description}</p>
    //               {currentUser.assessments.find(
    //                 (element) => element._id === assessment._id
    //               ) ? (
    //                 <button
    //                   onClick={() => handleStart(assessment._id)}
    //                   className="button-assess"
    //                 >
    //                   Retake
    //                 </button>
    //               ) : (
    //                 <button
    //                   onClick={() => handleStart(assessment._id)}
    //                   className="button-assess"
    //                 >
    //                   Start
    //                 </button>
    //               )}
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="profile">
    //         <h1 className="h1-container-profile">Profile</h1>
    //         <div className="profile-card">
    //           <div className="profile-title">
    //             <h3>Name:</h3>
    //             <h5>{currentUser.name}</h5>
    //           </div>
    //           <div className="profile-title">
    //             <h3>Email:</h3>
    //             <h5>{currentUser.email}</h5>
    //           </div>
    //           <div className="profile-title">
    //             <h3>Assessments Passed:</h3>
    //             <h5>{currentUser.assessments.length}</h5>
    //           </div>
    //           <div className="button-container">
    //             <button
    //               onClick={() => handleUser("delete", currentUser._id)}
    //               className="button-profile"
    //             >
    //               Delete Account
    //             </button>
    //             <button
    //               onClick={() => handleUser("logout", currentUser._id)}
    //               className="button-profile"
    //             >
    //               Logout
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </main>
    //   </div>
    // )
  //)
}

export default Home