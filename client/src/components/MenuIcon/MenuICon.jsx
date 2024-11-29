import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { colorVar } from "../../style/colorVar.js"
import { Stack } from '@mui/material';
import { useUserContext } from '../../context/User.jsx';
import Swal from 'sweetalert2';


const MenuICon = ({ icon, path, verifCo, shopNumberProduct, logount }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const {setToken,setInfoUser} = useUserContext();

    const onClick = () => {
        if (verifCo) {
            navigate('/login')
        }else{
            if (logount) { 
                Swal.fire({
                    text: "Vous avez été déconnecté",
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    timer: 1500,
                    showConfirmButton: false,
                })
                navigate('/')
                setToken()
                setInfoUser({
                    pseudo: "",
                    email: "",
                })
            }else{
                navigate(path)
            }
        }   
    }
   

    return (
        <>
            {React.createElement(icon, { onClick, sx: { color: pathname === path ? colorVar.backgroundPaleBlue : "white", height: "auto", fontSize:"23px"} })}
            {shopNumberProduct > 0 && <Stack sx={{ 
                position: 'absolute',
                top: {xs:20,sm:58}, right: {sm: 3},left:{xs:50, sm: 'auto'},
            backgroundColor: 'red', color: 'white', padding: '2px 5px', borderRadius: '100%', fontSize: 10 }}>{shopNumberProduct}</Stack>}
        </>
    )
}

export default MenuICon