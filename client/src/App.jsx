import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./page/Home/Home"
import { Navbar } from "./components/Navbar/Navbar"
import React, { useEffect, useState } from 'react'
import Profil from "./page/Profil/Profil"
import PageSupport from "./page/PageSupport/PageSupport"
import AddPublication from "./page/AddPublication/AddPublication"
import ShoppingCart from "./page/ShoppingCart/ShoppingCart"
import "./App.scss";
import Settings from "./page/Settings/Settings"
import { Sign } from "./page/Inscription/Sign"
import Login from "./page/Login/Login"
import User from "./context/User"
import DetailProduct from "./page/DetailProduct/DetailProduct"

function App() {
  const location = useLocation();
  const [displayNav, setDisplayNav] = useState(true)


  useEffect(() => {
    if (location.pathname === "/login" ||  location.pathname === "/sign" || location.pathname === "/Login" ) {
      setDisplayNav(false);
    }else{
      setDisplayNav(true);
    }
  }, [location])


  return (
    <>
      <User>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payments" element={<ShoppingCart />} />
          <Route path="/publication" element={<AddPublication />} />
          <Route path="/profil/:nameOtherUser?" element={<Profil />} />
          <Route path="/product/:productId" element={<DetailProduct />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<PageSupport />} />
        </Routes>
        {
          displayNav &&(
           <Navbar />   
          )
        }
      </User>
    </>
  )
}

export default App
