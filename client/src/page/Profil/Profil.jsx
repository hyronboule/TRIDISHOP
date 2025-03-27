import React, { useEffect, useState } from "react";
import "./profil.scss";
import { Button, Container, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { colorVar } from "../../style/colorVar.js";
import Image3D from "../../components/Image3D/Image3D.jsx";
import NavigationButton from "../../components/NavigationButton/NavigationButton.jsx";
import MenuLinks from "../../components/MenuLinks/MenuLinks.jsx";
import { useUserContext } from "../../context/User.jsx";
import { callApiProductsUser } from "../../services/callApiProducts.js";
import { apiCallUserProfil } from "../../services/callApiProfilUser.js";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { updateProfil } from "../../services/updateProfil.js";

const Profil = () => {
  const { infoUser, token } = useUserContext(); // user info who logged into the application
  const { nameOtherUser } = useParams();
  const [productsUser, setProductsUser] = useState();
  const [profilUser, setProfilUser] = useState();
  const [productPage, setProductPage] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProductsUser();
    setProductPage();
    if (nameOtherUser) {
      callApiForRetrieveInfoUser(nameOtherUser);
    } else {
      if (infoUser.pseudo) {
        callApiForRetrieveInfoUser(infoUser.pseudo);
      }
    }
  }, [infoUser, nameOtherUser, reload]);

  const callApiForRetrieveInfoUser = (info) => {
    if (info) {
      // retrieve the user's profile image
      apiCallUserProfil(info)
        .then((data) => {
          if (data) {
            setProfilUser(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching info user:", error);
        });
      // retrieve the user's products
      callApiProductsUser(info)
        .then((data) => {
          if (data) {
            setProductsUser(data.data);

            setProductPage(data.urlPage);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  };

  const handleUpdate = async () => {
    setReload(false);
    updateProfil(token, infoUser.pseudo).then((success) => {
      setReload(success);
    });
  };

  return (
    <>
      <Container className="page" maxWidth="100vw" sx={{ minHeight: "100%" }}>
        <NavigationButton url={"/products"} />
        {token && !nameOtherUser &&
          <Button
            variant="contained"
            tabIndex={0}
            onClick={() => handleUpdate()}
            sx={{
              background: colorVar.backgroundPaleBlue,
              position: "absolute",
              top: "80px",
              right: 25,
              padding: "5px",
              minWidth: 0,
              boxShadow: colorVar.boxShadow,
              borderRadius: "100%",
              color: colorVar.textColor,
              zIndex: 100,
            }}
          >
            {" "}
            <BorderColorRoundedIcon
              sx={{ color: "black", fontSize: 16 }}
            />{" "}
          </Button>
        }

        <Grid
          container
          gap={3}
          direction="column"
          justifyContent="space-between"
        >
          <Grid
            item
            width={"100%"}
            height={200}
            paddingBottom={3}
            paddingLeft={{ xs: 3, md: 15, lg: 20 }}
            paddingRight={{ xs: 3, md: 15, lg: 20 }}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: { xs: "end", sm: "center" },
              justifyContent: "space-between",
              background: colorVar.backgroundBlue,
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Stack
              height={{ xs: 90, sm: 150 }}
              width={{ xs: 90, sm: 150 }}
              top={{ xs: 135, sm: 170 }}
              borderRadius={100}
              border={`2px solid ${colorVar.backgroundPaleBlue}`}
              className="positionAbsolute"
            >
              {profilUser && (
                <img
                  className="imgProfile"
                  src={profilUser.image}
                  alt="image profile"
                />
              )}
            </Stack>

            {profilUser && <h2 id="titleProfil">{`@${profilUser.pseudo}`}</h2>}
            {profilUser &&
              (profilUser.links.instagram || profilUser.links.facebook) && (
                <MenuLinks
                  links={[
                    profilUser.links.instagram && {
                      title: "Instagram",
                      link: profilUser.links.instagram,
                      icon: "",
                    },
                    profilUser.links.facebook && {
                      title: "Facebook",
                      link: profilUser.links.facebook,
                      icon: "",
                    },
                  ].filter(Boolean)}
                />
              )}
          </Grid>

          <Image3D
            classname="sidePadding"
            values={productsUser}
            setValues={setProductsUser}
            urlPage={productPage}
            setUrlPage={setProductPage}
          />
        </Grid>
      </Container>
    </>
  );
};

export default Profil;
