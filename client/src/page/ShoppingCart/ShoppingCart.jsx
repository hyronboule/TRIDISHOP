import React, { useEffect, useState } from 'react'
import "./shoppingCart.scss"
import { Container, Grid, Stack } from '@mui/material'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import Image3D from '../../components/Image3D/Image3D'
import { colorVar } from '../../style/colorVar'
import { useUserContext } from '../../context/User'
import InputText from '../../components/InputText/InputText'
import { apiCallUserProfil } from '../../services/callApiProfilUser'
import { callApiServicePayment } from '../../services/callApiService'
import { downloadFiles } from '../../services/downloadFiles'
import Swal from 'sweetalert2'
import { callApiUpdatePoducts } from '../../services/callApiProducts'

const ShoppingCart = () => {
  const { productShops, setProductShops } = useUserContext()
  const [listSeller, setListSeller] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const totalPrice = () => {
    let total = 0
    productShops.map((e) => {
      total += e.price
    })
    return total
  }


  const handleClick = () => {
    if (name) {
      addSeller()
      if (totalPrice() === 0) {
       downaloadAndUpdateProduct()
      } else {
        if (email) {
          // call the API to get the Paypal email of each seller
          listSeller.map((e) => {
            apiCallUserProfil(e.sellerPayPalId).then((data) => {
              e.sellerPayPalId = data.paypalEmail
            }).catch((error) => {
              console.error('Error during API call:', error);
            })
          })

          // call api payement
          callApiServicePayment(email, listSeller).then((data) => {
            if (data) {
              let url = data.approvalUrl

              openPaymentWindow(url).then((message) => {
                if (message == true) {
                  downaloadAndUpdateProduct()
                }
              });
            }
          })

        } else {
          Swal.fire({
            text: `Veuillez renseigner votre email`,
            icon: 'error',
          })
        }

      }

    } else {
      Swal.fire({
        text: `Veuillez renseigner votre nom`,
        icon: 'error',
      })
    }
  }


  function openPaymentWindow(url) {
    return new Promise((resolve, reject) => {
      const paymentWindow = window.open(url, '_blank');

      if (!paymentWindow) {
        reject(
          Swal.fire({
            text: 'Impossible d\'ouvrir la fenêtre de paiement.',
            icon: 'error',
          })
        );
        return;
      }

      const receiveMessage = (event) => {
        //Check that the message comes from the correct origin
        if (event.origin !== 'http://localhost:3000') return;

        //Check if the message indicates that the payment was successful
        if (event.data && event.data.message === 'paiementRéussi') {
          console.log(event.data);

          resolve(true);
          paymentWindow.close(); // close window
        }
      };
      window.addEventListener('message', receiveMessage);
    });
  }



  // add all seller and amount per seller
  const addSeller = () => {
    productShops.forEach(product => {
      const { pseudo, price } = product;
      const seller = listSeller.find(seller => seller.sellerPayPalId === pseudo);

      // convert price to float and round to 2 decimal 
      const priceFloat = parseFloat(price).toFixed(2);

      // if seller in listSeller is true
      if (seller) {
        // add price in the amount
        seller.amount = (parseFloat(seller.amount) + parseFloat(priceFloat)).toFixed(2);
      } else {
        // add new seller in listSeller
        listSeller.push({
          sellerPayPalId: pseudo,
          amount: parseFloat(priceFloat).toFixed(2)
        });
      }
    });
  };

const downaloadAndUpdateProduct = () => {
  // download the files
  downloadFiles(productShops, name, totalPrice())

  //  appel api changement nombre de téléchargement
  try {
    productShops.forEach((item) => {
      callApiUpdatePoducts(item.nameFile,{download: item.download += 1})
    })
    
  } catch (error) {
    console.error('Error updating download count:', error);
   
  }

  setName()
  setEmail()
  setListSeller([])
  setProductShops([])
}

  return (
    <>
      <Container className='page' maxWidth="100vw" sx={{ padding: { sm: " 0px 40px 0px 0px", xs: "0px 0px 50px 0px" }, minHeight: "100%" }}  >
        <NavigationButton url={'/'} />
        <Stack padding={{ xs: "60px 20px 0px 20px", md: "80px 40px 0px 40px" }} >
          <h1 className='secondTitle' style={{ width: "fit-content" }}>Panier: </h1>

          <Grid display={'flex'} justifyContent={"space-around"} flexDirection={{ xs: "column", md: "row" }} height={"70vh"} marginTop={{ xs: 3, md: 5 }} >
            <Grid item sx={{ background: colorVar.backgroundPaleGrey }} height={{ xs: "55%", md: "100%" }} width={{ xs: "100%", md: "45%" }} borderRadius={5} padding={2} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
              <Stack sx={{ height: "85%", overflowY: "scroll" }}>
                <Image3D classname={"image3DShop"}
                  values={productShops.length > 0 ? productShops : 0}
                  displayShowMore={true} displayButtonDelete={true} />
              </Stack>
              <Stack sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "end", gap: 3, marginBottom:2 }}>
                <p>Total: {productShops.length > 0 ? totalPrice() : 0} €</p>
                <button className='buttonValidation boutonShop' onClick={() => handleClick()}>Payer</button>
              </Stack>
              <p style={{fontSize:10}}>* Si le total dépasse 0 euro, des frais sont ajoutés égal à 5% du prix total</p>
            </Grid>

            <Grid item sx={{ background: colorVar.backgroundPaleGrey }} height={{ xs: "40%", md: "50%" }} width={{ xs: "100%", md: "45%" }} borderRadius={5}
              padding={3}
            >
              <h2 style={{ fontSize: 19, fontWeight: '500' }}>Informations :</h2>
              <Stack justifyContent={"space-between"} display={"flex"} flexDirection={"column"} height={"70%"}>
                <InputText className={"inputLogin inputShop"} type={'text'} placeholder={"Email du paypal..."} value={email} setValue={setEmail} />
                <InputText className={"inputLogin inputShop"} type={'text'} placeholder={"Nom, Prénom..."} value={name} setValue={setName} />
              </Stack>

            </Grid >
          </Grid>
        </Stack>
      </Container>
    </>
  )
}

export default ShoppingCart