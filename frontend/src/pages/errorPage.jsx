import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
import errorPageUser from '../components/errorPageUser'

function errorPage() {
  return (
    <div>
        {/* <Header /> */}
        <Navbar />
        {/* <Sidebar /> */}
        <errorPageUser />
        <Footer />
    </div>
  )
}

export default errorPage