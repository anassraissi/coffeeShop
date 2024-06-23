
import React from 'react'
import CategoryForm from '../../components/CategoryForm'
import Layout from '../../components/Layout'

const AddCategory = () => {
  return (
      <Layout>
      <div className="bg-image">
        <div className="welcome-text">
        <CategoryForm></CategoryForm>
        </div>
      </div>
      </Layout>
  )
}

export default AddCategory