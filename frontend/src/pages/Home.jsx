import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
import Body from '../components/Body'

function Home() {
  return (
    <div>
        {/* <Header /> */}
        <Navbar />
        {/* <Sidebar /> */}
        <Body />
        <Footer />
    </div>
  )
}

export default Home