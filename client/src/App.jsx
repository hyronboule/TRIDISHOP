import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./page/Home/Home"
import { Navbar } from "./components/Navbar/Navbar"
import React from 'react'
import Profil from "./page/Profil/Profil"
import PageSupport from "./page/PageSupport/PageSupport"
import AddPublication from "./page/AddPublication/AddPublication"
import ShoppingCart from "./page/ShoppingCart/ShoppingCart"
import "./App.scss";
import Settings from "./page/Settings/Settings"
import { Sign } from "./page/Inscription/Sign"
import Login from "./page/Login/Login"
import User from "./context/User"

function App() {
  const location = useLocation();

  return (
    <>
      <User>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/AddPublication" element={<AddPublication />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/PageSupport" element={<PageSupport />} />
        </Routes>
        {
          location.pathname != "/Login" && location.pathname != "/Sign" ?
            <Navbar />
            : ""
        }
      </User>
    </>
  )
}

export default App
