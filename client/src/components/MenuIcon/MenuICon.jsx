import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { colorVar } from "../../style/colorVar.js"
import { Stack } from '@mui/material';


const MenuICon = ({ icon, path, verifCo, shopNumberProduct }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const onClick = () => {
        verifCo ?
            navigate('/login') :
            navigate(path)
    }
   

    return (
        <>
            {React.createElement(icon, { onClick, sx: { color: pathname === path ? colorVar.backgroundPaleBlue : "white", height: "auto"} })}
            {shopNumberProduct > 0 && <Stack sx={{ 
                position: 'absolute',
                top: {xs:20,sm:70}, right: {sm: 3},left:{xs:60, sm: 'auto'},
            backgroundColor: 'red', color: 'white', padding: '2px 5px', borderRadius: '100%', fontSize: 10 }}>{shopNumberProduct}</Stack>}
        </>
    )
}

export default MenuICon