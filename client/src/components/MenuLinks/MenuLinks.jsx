import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import  {colorVar}  from "../../style/colorVar";

const MenuLinks = ({ links }) => {


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div id="menuLinks" >
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{color: !open?'white':colorVar.backgroundPaleBlue, backgroundColor: colorVar.backgroundText}}
            >
                Liens +
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                sx={{
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: colorVar.backgroundPaleBlue, 
                            color: 'white', 
                        },
                    },
                }}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    links.map((link, index) => (

                        <MenuItem key={index} onClick={handleClose}>
                            <a href={link.link} target="_blank" rel="noopener noreferrer">{link.title}</a>
                        </MenuItem>
                    ))
                }

            </Menu>
        </div>
    )
}

export default MenuLinks