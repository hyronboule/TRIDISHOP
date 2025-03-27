import React from "react";
import { AppBar, Container, Stack } from "@mui/material";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
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
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

export const Navbar = () => {
  const { userLogin, productShops, token, infoUser } = useUserContext();
  const LogoIcon = () => (
    <img src={logo} alt="Logo de Tridishop" style={{ height: "23px" }} />
  );

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
        }}
      >
        <Container
          maxWidth="x1"
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding : "0px 15px !important"
          }}
        >
          <Stack
            width={"fit-content"}
            height={"auto"}
            paddingRight={{ xs: 2, md: 3 }}
          >
            <MenuICon
              icon={LogoIcon}
              path="/"
              name={"Accueil"}
              className={"nameNav"}
            />
          </Stack>
          <Stack direction={"row"} spacing={{ xs: 1, sm: 2, md: 3 }}>
            <MenuICon
              className={"nameNav"}
              icon={ViewInArRoundedIcon}
              path="/products"
              name={"Produits"}
            />
            <MenuICon
              className={"nameNav"}
              //   shopNumberProduct={productShops.length}
              icon={ShoppingBasketIcon}
              path="/payments"
              // verifCo={userLogin}
              name={"Panier"}
            />

            {token && (
              <>
                <MenuICon
                  className={"nameNav"}
                  icon={AddCircleIcon}
                  path="/publication"
                  verifCo={userLogin}
                  name={"Publier"}
                />

                <MenuICon
                  className={"nameNav"}
                  icon={AccountCircleIcon}
                  path="/profil"
                  verifCo={userLogin}
                  name={"Profil"}
                />
              </>
            )}

            <MenuICon
              icon={ContactSupportIcon}
              className={"nameNav"}
              path="/support"
              name={"Aide"}
            />
            {token && infoUser.role === "admin" && (
              <MenuICon
                className={"nameNav"}
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
            spacing={{xs:1,md:2 ,lg:3}}
          >
            {!userLogin && (
              <MenuICon
                className={"nameNav"}
                icon={LogoutRoundedIcon}
                logount={true}
                name={"Déconexion"}
              />
            )}
            {token ? (
              <MenuICon
                className={"nameNav"}
                icon={SettingsIcon}
                path="/settings"
                verifCo={userLogin}
              />
            ) : (
              <Stack className="signDisplayNav" flexDirection={"row"} gap={{xs:3,sm:5}}>
                <MenuICon
                  className={"nameSignNav"}
                  icon={AccountCircleIcon}
                  path="/login"
                  name={"Connexion"}
                />
                <MenuICon
                  className={"nameSignNav"}
                  icon={PersonAddAltRoundedIcon}
                  path="/sign"
                  name={"Inscription"}
                />
              </Stack>
            )}
          </Stack>
        </Container>
      </AppBar>
    </nav>
  );
};
