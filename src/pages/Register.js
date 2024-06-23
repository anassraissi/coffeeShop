import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import Layout from '../../components/Layout'

const Register = () => {
  return (
<Layout>
      <div className="bg-image">
        <div className="welcome-text">
          <RegisterForm></RegisterForm>
        </div>
      </div>
</Layout>
  )
}

export default Register