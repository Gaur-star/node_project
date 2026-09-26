import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
import Shop from '../components/ShopUser'

function Shop() {
  return (
    <div>
        {/* <Header /> */}
        <Navbar />
        {/* <Sidebar /> */}
        <Shop />
        <Footer />
    </div>
  )
}

export default Shop