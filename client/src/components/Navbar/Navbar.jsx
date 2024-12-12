import React from 'react'
import { AppBar, Container, Stack } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuICon from '../MenuIcon/MenuICon'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { colorVar } from "../../style/colorVar.js"
import { useUserContext } from '../../context/User.jsx';





export const Navbar = () => {
    const { userLogin, productShops } = useUserContext()
  

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
            <Container maxWidth="x1" sx={{ height: "100%", display: 'flex', flexDirection: { sm: "column" }, padding: { xs: "0px 10px", sm: "20px 0" }, alignItems: "center" }}  >
               
                {/* <img style={{ width: '30px', height: 'auto' }} src={logo} /> */}
                
                <Stack direction={{ xs: "row", sm: "column" }} 
                // marginTop={{xs:0,sm:5}} marginLeft={{xs:2,sm:0}} 
                spacing={{ xs: 2, sm: 10 }} >

                    <MenuICon icon={HomeIcon} path="/" />
                    <MenuICon
                        shopNumberProduct={productShops.length}
                        icon={ShoppingBasketIcon} path="/payments" />
                    <MenuICon icon={AddCircleIcon} path="/publication" verifCo={userLogin} />
                    <MenuICon icon={AccountCircleIcon} path="/profil" verifCo={userLogin} />
                    <MenuICon icon={ContactSupportIcon} path="/support" />
                </Stack>

                <Stack marginLeft={{xs:'auto', sm:0}} marginTop={{xs:0,sm:'auto'}} direction={{ xs: "row", sm: "column" }} spacing={2}>
                    {
                        !userLogin &&
                        <MenuICon icon={LogoutRoundedIcon} logount={true} />
                    }
                    <MenuICon icon={SettingsIcon} path="/settings" verifCo={userLogin} />
                </Stack>

            </Container>
        </AppBar >
    )
}
