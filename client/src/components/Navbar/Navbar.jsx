import React from "react";
import { AppBar, Container, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuICon from "../MenuIcon/MenuICon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { colorVar } from "../../style/colorVar.js";
import { useUserContext } from "../../context/User.jsx";
import logo from "../../assets/logoTridi.png";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";

export const Navbar = () => {
  const { userLogin, productShops, token, infoUser } = useUserContext();

  return (
    <nav>
      <AppBar
        className="nav"
        position="fixed"
        sx={{
          height: "5vh",
          minHeight: "35px",
          backgroundColor: colorVar.backgroundGrey,
          top: "0",

          // [theme.breakpoints.up('sm')]: {
          //     height: "100%", width: 40, backgroundColor: colorVar.backgroundGrey, top: 0, right: 0
          // }
        }}
      >
        <Container
          maxWidth="x1"
          sx={{
            height: "100%",
            display: "flex",
            padding: "0px 10px",
            alignItems: "center",
          }}
        >
          <Stack width={30} height={"auto"} paddingRight={2}>
            <img src={logo} alt="Logo de tridishop" />
          </Stack>
          <Stack direction={"row"} spacing={{ xs: 1, sm: 2, md: 5 }}>
            <MenuICon icon={HomeIcon} path="/home" name={"Acceuil"} />

            <MenuICon
              //   shopNumberProduct={productShops.length}
              icon={ShoppingBasketIcon}
              path="/payments"
              verifCo={userLogin}
              name={"Panier"}
            />

            <MenuICon
              icon={AddCircleIcon}
              path="/publication"
              verifCo={userLogin}
              name={"Publier"}
            />

            <MenuICon
              icon={AccountCircleIcon}
              path="/profil"
              verifCo={userLogin}
              name={"Profil"}
            />

            <MenuICon icon={ContactSupportIcon} path="/support" name={"Aide"} />
            {token && infoUser.role === "admin" && (
              <MenuICon
                icon={AdminPanelSettingsRoundedIcon}
                path="/admin"
                name={"Admin"}
              />
            )}
          </Stack>

          <Stack
            marginLeft={"auto"}
            marginTop={0}
            direction={"row"}
            spacing={2}
          >
            {!userLogin && (
              <MenuICon
                icon={LogoutRoundedIcon}
                logount={true}
                name={"Déconexion"}
              />
            )}
            <MenuICon
              icon={SettingsIcon}
              path="/settings"
              verifCo={userLogin}
            />
          </Stack>
        </Container>
      </AppBar>
    </nav>
  );
};
