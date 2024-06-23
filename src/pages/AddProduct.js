
import React from 'react'
import ProductForm from '../../components/ProductForm'
import Layout from '../../components/Layout'


const AddProduct = () => {
  return (
    <Layout>
    <div className="bg-image">
      <div className="welcome-text">
        <ProductForm></ProductForm>
      </div>
    </div>
    </Layout>  )
}

export default AddProduct