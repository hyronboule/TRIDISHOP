import React, { useState } from "react";
import "./shoppingCart.scss";
import { Container, Grid, Stack } from "@mui/material";
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import Image3D from "../../components/Image3D/Image3D";
import { colorVar } from "../../style/colorVar";
import { useUserContext } from "../../context/User";
import InputText from "../../components/InputText/InputText";
import { apiCallUserProfil } from "../../services/callApiProfilUser";
import { callApiServicePayment } from "../../services/callApiService";
import { downloadFiles } from "../../services/downloadFiles";
import Swal from "sweetalert2";
import { callApiUpdatePoducts } from "../../services/callApiProducts";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { productShops, setProductShops } = useUserContext();
  const [listSeller, setListSeller] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { token } = useUserContext();
  const navigate = useNavigate()

  const totalPrice = () => {
    let total = 0;
    productShops.map((e) => {
      total += e.price;
    });
    return total;
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleClick = () => {
    if (name && productShops.length > 0) {
      addSeller();
      if (totalPrice() === 0) {
        downaloadAndUpdateProduct();
      } else {
        if (email) {
          if (!validateEmail(email)) {
            Swal.fire({
              text: "Veuillez renseigner une email paypal valide.",
              icon: "error",
            });
            return;
          }
          // call the API to get the Paypal email of each seller
          listSeller.map((e) => {
            apiCallUserProfil(e.sellerPayPalId)
              .then((data) => {
                e.sellerPayPalId = data.paypalEmail;
              })
              .catch((error) => {
                console.error("Error during API call:", error);
              });
          });

          // call api payement
          callApiServicePayment(email, listSeller).then((data) => {
            if (data) {
              let url = data.approvalUrl;

              openPaymentWindow(url).then((message) => {
                if (message == true) {
                  downaloadAndUpdateProduct();
                }
              });
            }
          });
        } else {
          Swal.fire({
            text: `Veuillez renseigner votre email`,
            icon: "error",
          });
        }
      }
    } else {
      if (!productShops.length > 0) {
        Swal.fire({
          text: `Veuillez ajouter des produits`,
          icon: "error",
        });
      } else {
        Swal.fire({
          text: `Veuillez renseigner votre nom`,
          icon: "error",
        });
      }
    }
  };

  function openPaymentWindow(url) {
    return new Promise((resolve, reject) => {
      const paymentWindow = window.open(url, "_blank");

      if (!paymentWindow) {
        reject(
          Swal.fire({
            text: "Impossible d'ouvrir la fenêtre de paiement. Veuillez désactiver le bloqueur de pop-ups ou autoriser les fenêtres de ce site.",
            icon: "error",
          })
        );
        return;
      }

      const receiveMessage = (event) => {
        //Check that the message comes from the correct origin
        if (event.origin !== "https://tridishop.site") return;

        //Check if the message indicates that the payment was successful
        if (event.data && event.data.message === "paiementRéussi") {
          resolve(true);
          paymentWindow.close(); // close window
        }
      };
      window.addEventListener("message", receiveMessage);
    });
  }

  // add all seller and amount per seller
  const addSeller = () => {
    productShops.forEach((product) => {
      const { pseudo, price } = product;
      const seller = listSeller.find(
        (seller) => seller.sellerPayPalId === pseudo
      );

      // convert price to float and round to 2 decimal
      const priceFloat = parseFloat(price).toFixed(2);

      // if seller in listSeller is true
      if (seller) {
        // add price in the amount
        seller.amount = (
          parseFloat(seller.amount) + parseFloat(priceFloat)
        ).toFixed(2);
      } else {
        // add new seller in listSeller
        listSeller.push({
          sellerPayPalId: pseudo,
          amount: parseFloat(priceFloat).toFixed(2),
        });
      }
    });
  };

  const downaloadAndUpdateProduct = () => {
    // download the files
    downloadFiles(productShops, name, totalPrice());

    //  appel api changement nombre de téléchargement
    try {
      productShops.forEach((item) => {
        callApiUpdatePoducts(
          item.nameFile,
          { download: (item.download += 1) },
          token
        );
      });
    } catch (error) {
      console.error("Error updating download count:", error);
    }

    setName();
    setEmail();
    setListSeller([]);
    setProductShops([]);
  };

  const modal = () => {
    Swal.fire({
      title: "Action requise",
      text: "Veuillez vous connecter ou vous inscrire avant le paiement.",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Se connecter",
      denyButtonText: "S'inscrire",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login"); 
      } else if (result.isDenied) {
        navigate( "/sign"); 
      }
    });
  };
  

  return (
    <>
      <Container className="page" maxWidth="100vw" sx={{ minHeight: "100%" }}>
        <Stack >
          <h1 className="secondTitle" style={{ width: "fit-content" }}>
            Panier:{" "}
          </h1>

          <Grid
            display={"flex"}
            justifyContent={"space-around"}
            flexDirection={{ xs: "column", md: "row" }}
            height={"65vh"}
            marginTop={{ xs: 3, md: 5 }}
          >
            <Grid
              item
              sx={{ background: colorVar.backgroundPaleGrey }}
              height={{ xs: "55%", md: "100%" }}
              width={{ xs: "100%", md: "45%" }}
              borderRadius={5}
              padding={2}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <Stack sx={{ height: "85%", overflowY: "scroll" }}>
                <Image3D
                  classname={"image3DShop"}
                  values={productShops.length > 0 ? productShops : 0}
                  displayShowMore={true}
                  displayButtonDelete={true}
                />
              </Stack>
              <Stack
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "end",
                  gap: 3,
                  marginBottom: 2,
                }}
              >
                <div >
                  <p>Total: {productShops.length > 0 ? totalPrice() : 0} €</p>
                  <p>
                    + frais :{" "}
                    {productShops.length > 0 ? totalPrice() * 0.05 : 0} €
                  </p>
                </div>
                <button
                  className="buttonValidation boutonShop"
                  onClick={() => {
                    token?
                    handleClick(): modal()}}
                >
                  Payer
                </button>
              </Stack>

              <p style={{ fontSize: 13 }}>
                * Si le total dépasse 0 euro, des frais sont ajoutés égal à 5%
                du prix total
              </p>
            </Grid>

            <Grid
              item
              sx={{ background: colorVar.backgroundPaleGrey }}
              height={{ xs: "40%", md: "50%" }}
              width={{ xs: "100%", md: "45%" }}
              borderRadius={5}
              padding={3}
            >
              <h2 style={{ fontSize: 19, fontWeight: "500" }}>
                Informations :
              </h2>
              <Stack
                justifyContent={"space-between"}
                display={"flex"}
                flexDirection={"column"}
                height={"70%"}
              >
                {
                  totalPrice() > 0 &&
                  <InputText
                    className={"inputLogin inputShop"}
                    type={"text"}
                    placeholder={"Email du paypal..."}
                    value={email}
                    setValue={setEmail}
                  />
                }
                <InputText
                  className={"inputLogin inputShop"}
                  type={"text"}
                  placeholder={"Nom, Prénom..."}
                  value={name}
                  setValue={setName}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default ShoppingCart;
