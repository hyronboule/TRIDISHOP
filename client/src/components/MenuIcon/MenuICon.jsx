import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { colorVar } from "../../style/colorVar.js"

const MenuICon = ({ icon, path}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const onClick = () => {
        navigate(path)
    }
    return (
        <>
            {React.createElement(icon, { onClick, sx:{ color: pathname === path? colorVar.backgroundPaleBlue : "white", height: "auto" } })}
        </>
    )
}

export default MenuICon