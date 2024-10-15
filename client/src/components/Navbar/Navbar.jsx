import React, { useState } from 'react'
import { AppBar, Container, Stack } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuICon from '../MenuIcon/MenuICon'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { colorVar } from "../../style/colorVar.js"
import { useUserContext } from '../../context/User.jsx';
import { useNavigate } from 'react-router-dom';



export const Navbar = () => {
    const { userLogin, productShops } = useUserContext()
    const navigate = useNavigate()

    return (
        <AppBar className='nav' position="fixed" sx={
            (theme) => ({
                [theme.breakpoints.down('sm')]: {
                    height: "5vh", minHeight: "35px", backgroundColor: colorVar.backgroundGrey, bottom: 0, top: 'auto'
                },
                [theme.breakpoints.up('sm')]: {
                    height: "100%", width: 40, backgroundColor: colorVar.backgroundGrey, top: 0, right: 0
                }
            })
        }>
            <Container maxWidth="x1" sx={{ height: "100%", display: 'flex', justifyContent: "space-between", flexDirection: { sm: "column" }, padding: { xs: "0px 20px", sm: "30px 0" }, alignItems: "center" }}  >
                <Stack direction={{ xs: "row", sm: "column" }} spacing={{ xs: 3, sm: 10 }} >
                    <MenuICon icon={HomeIcon} path="/" />
                    <MenuICon
                        shopNumberProduct={productShops.length}
                        icon={ShoppingBasketIcon} path="/ShoppingCart" />
                    <MenuICon icon={AddCircleIcon} path="/AddPublication" verifCo={userLogin} />
                    <MenuICon icon={AccountCircleIcon} path="/Profil" verifCo={userLogin} />
                    <MenuICon icon={ContactSupportIcon} path="/PageSupport" />
                </Stack>

                <Stack direction={"row"} >
                    <MenuICon icon={SettingsIcon} path="/Settings" verifCo={userLogin} />
                </Stack>

            </Container>
        </AppBar >
    )
}
