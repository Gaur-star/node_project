import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
import Cartcollect from '../components/Cartcollect'

function Cart() {
  return (
    <div>
        {/* <Header /> */}
        <Navbar />
        {/* <Sidebar /> */}
        <Cartcollect />
        <Footer />
    </div>
  )
}

export default Cart