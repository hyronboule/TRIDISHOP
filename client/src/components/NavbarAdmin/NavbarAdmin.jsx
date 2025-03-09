import React from "react";
import { AppBar, Container, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar.js";
import MenuICon from "../MenuIcon/MenuICon.jsx";
import HomeIcon from "@mui/icons-material/Home";

export const NavbarAdmin = () => {
  return (
    <AppBar
      className="nav"
      position="fixed"
      sx={{
        zIndex:0,
        height: "100vh",
        width:"fit-content",
        minHeight: "35px",
        backgroundColor: colorVar.backgroundGrey,
        top: "0",
        left:"0",
      }}
    >
      <Container
        sx={{
          height: "100%",
          display: "flex",
          padding: "0px 10px",
          alignItems:"center",
        }}
      >
        <Stack direction={"column"} spacing={{ xs: 2, md: 5 }}>
          <MenuICon icon={HomeIcon} path="/admin/users" name={"Utilisateurs"} />
          <MenuICon icon={HomeIcon} path="/admin/products" name={"Produits"} />
        </Stack>
      </Container>
    </AppBar>
  );
};
