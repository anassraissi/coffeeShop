// components/Layout.js
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'

const Layout = ({children}) => {
  return (
    <div className="page-container">
            <Navbar />

      <main className="content-wrap">
      <Head>
        <style>{`
          .bg-image { 
            background-image: url('https://img.freepik.com/free-photo/top-view-bowls-with-coffee-beans-powder_23-2148937321.jpg?size=626&ext=jpg');
            background-size: cover;
            background-position: center;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
          }
          .welcome-text {
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
          }
        `}</style>
      </Head>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout

