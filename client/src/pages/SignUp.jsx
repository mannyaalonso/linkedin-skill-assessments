import { useState, useEffects } from 'react'
import Form from '../components/Form'


const SignUp = ({ handleUser, users }) => {
  return (
    <div>
      <Form handleUser={handleUser} users={users}/>
    </div>
  )
}

export default SignUp
