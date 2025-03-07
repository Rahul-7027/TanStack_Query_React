import React from 'react'
import Home from './Home'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout

