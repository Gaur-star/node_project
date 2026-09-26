import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
import Contact from '../components/ContactUser'

function Home() {
  return (
    <div>
        {/* <Header /> */}
        <Navbar />
        {/* <Sidebar /> */}
        <Contact />
        <Footer />
    </div>
  )
}

export default Home