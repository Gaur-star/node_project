import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
import error_page from '../components/404'

function Home() {
  return (
    <div>
        {/* <Header /> */}
        <Navbar />
        {/* <Sidebar /> */}
        <error_page />
        <Footer />
    </div>
  )
}

export default 404