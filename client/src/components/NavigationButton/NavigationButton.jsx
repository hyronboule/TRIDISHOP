import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import { colorVar } from '../../style/colorVar.js';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const NavigationButton = ({ url, onClick }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (onClick) { onClick() }
        navigate(url);
    };
    
    return (
        <Button
            variant="contained"
            tabIndex={0}
            sx={{
                background: colorVar.backgroundPaleBlue,
                position: 'absolute',
                top: 10,
                left: 25,
                padding: "3px",
                minWidth: 0,
                boxShadow: colorVar.boxShadow,
                borderRadius: '100%',
                color: colorVar.textColor,
                zIndex: 100
            }}
            onClick={handleClick}
        ><ArrowBackIosNewIcon sx={{ color: colorVar.backgroundBlue, fontSize: { xs: 17, md: 20 } }} /></Button >

    )
}

export default NavigationButton