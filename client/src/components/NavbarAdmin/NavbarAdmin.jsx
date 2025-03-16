import React from "react";
import { AppBar, Container, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar.js";
import MenuICon from "../MenuIcon/MenuICon.jsx";
import HomeIcon from "@mui/icons-material/Home";
import AccessibilityRoundedIcon from "@mui/icons-material/AccessibilityRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

export const NavbarAdmin = () => {
  return (
    <AppBar
      className="nav"
      position="fixed"
      sx={{
        zIndex: 0,
        height: "100vh",
        width: "fit-content",
        minHeight: "35px",
        backgroundColor: colorVar.backgroundGrey,
        top: "0",
        left: "0",
      }}
    >
      <Container
        sx={{
          height: "100%",
          display: "flex",
          padding: "0px 10px",
          alignItems: "center",
          alignItems: "flex-start",
          paddingTop: " 90px",
        }}
      >
        <Stack direction={"column"} spacing={{ xs: 2, md: 5 }}>
          <MenuICon
            icon={AccessibilityRoundedIcon}
            path="/admin/users"
            name={"Utilisateurs"}
          />
          <MenuICon
            icon={CategoryRoundedIcon}
            path="/admin/products"
            name={"Produits"}
          />
          <MenuICon
            icon={PaidRoundedIcon}
            path="/admin/transactions"
            name={"Transactions"}
          />
        </Stack>
      </Container>
    </AppBar>
  );
};
