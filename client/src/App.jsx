import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Profil from "./page/Profil/Profil";
import PageSupport from "./page/PageSupport/PageSupport";
import AddPublication from "./page/AddPublication/AddPublication";
import ShoppingCart from "./page/ShoppingCart/ShoppingCart";
import "./App.scss";
import Settings from "./page/Settings/Settings";
import { Sign } from "./page/Inscription/Sign";
import Login from "./page/Login/Login";
// import User from "./context/User"
import DetailProduct from "./page/DetailProduct/DetailProduct";
import Vitrine from "./page/Vitrine/Vitrine.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Cgv from "./page/conditions/Cgv/Cgv.jsx";
import Cgu from "./page/conditions/Cgu/Cgu.jsx";
import Pdc from "./page/conditions/Pdc/Pdc.jsx";
import { useUserContext } from "./context/User.jsx";
import Admin from "./page/admin/Admin.jsx";
import AdminUser from "./page/AdminUser/AdminUser.jsx";
import AdminProduct from "./page/adminProduct/AdminProduct.jsx";
import AdminTransaction from "./page/AdminTransaction/AdminTransaction.jsx";

function App() {
  const location = useLocation();
  const { infoUser, token } = useUserContext();

  // useEffect(() => {
  //   if (location.pathname === "/login" ||  location.pathname === "/sign" || location.pathname === "/Login" ) {
  //     setDisplayNav(false);
  //   }else{
  //     setDisplayNav(true);
  //   }
  // }, [location])

  return (
    <>
      {/* <User> */}

      <Routes>
        <Route path="/" element={<Vitrine />} />
        <Route path="/products" element={<Home />} />
        <Route path="/payments" element={<ShoppingCart />} />
        <Route path="/product/:productId" element={<DetailProduct />} />
        <Route path="/profil/:nameOtherUser" element={<Profil />} />
        {token && (
          <>
            <Route path="/profil" element={<Profil />} />
            <Route path="/publication" element={<AddPublication />} />
            <Route path="/settings" element={<Settings />} />
          </>
        )}
        <Route path="/sign" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/support" element={<PageSupport />} />
        // Routes CGU CGV and policy confidentiality
        <Route path="/cgv" element={<Cgv />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route path="/pdc" element={<Pdc />} />
        {infoUser.role === "admin" && token && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUser />} />
            <Route path="/admin/products" element={<AdminProduct />} />
            <Route path="/admin/transactions" element={<AdminTransaction />} />
          </>
        )}
      </Routes>

      <Navbar />
      <Footer />

      {/* </User> */}
    </>
  );
}

export default App;
