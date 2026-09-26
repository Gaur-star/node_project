import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
import ShopdetailsUser from '../components/ShopdetailsUser'

function Shopdetails() {
  return (
    <div>
        {/* <Header /> */}
        <Navbar />
        {/* <Sidebar /> */}
        <ShopdetailsUser />
        <Footer />
    </div>
  )
}

export default Shopdetails