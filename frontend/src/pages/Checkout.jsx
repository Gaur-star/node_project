import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
import CheckoutUser from '../components/CheckoutUser'

function Checkout() {
  return (
    <div>
        {/* <Header /> */}
        <Navbar />
        {/* <Sidebar /> */}
        <CheckoutUser />
        <Footer />
    </div>
  )
}

export default Checkout