import React, { useState } from 'react'
import "./shoppingCart.scss"
import { Container, Grid, Stack } from '@mui/material'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import Image3D from '../../components/Image3D/Image3D'
import { colorVar } from '../../style/colorVar'
import { useUserContext } from '../../context/User'
import InputText from '../../components/InputText/InputText'

const ShoppingCart = () => {
  const { productShops } = useUserContext()
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
    console.log('ok');
    setName()
    setEmail()
  }
  return (
    <>
      <Container className='page' maxWidth="100vw" sx={{ padding: { sm: " 0px 40px 0px 0px", xs: "0px 0px 50px 0px" }, minHeight: "100%" }}  >
        <NavigationButton url={'/'} />
        <Stack padding={{xs:"60px 20px 0px 20px",md:"80px 40px 0px 40px"}} >
          <h1 className='secondTitle' style={{ width: "fit-content" }}>Panier: </h1>

          <Grid display={'flex'} justifyContent={"space-around"} flexDirection={{ xs: "column", md: "row" }} height={"70vh"} marginTop={{xs:3, md:5}} >
            <Grid item sx={{ background: colorVar.backgroundPaleGrey }} height={{xs:"55%",md:"100%"}} width={{ xs: "100%", md: "45%" }} borderRadius={5} padding={2} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
              <Stack sx={{ height: "85%", overflowY: "scroll" }}>
                <Image3D classname={"image3DShop"}
                  values={productShops.length > 0 ? productShops : 0}
                  displayShowMore={true} />
              </Stack>
              <Stack sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "end", gap: 3 }}>
                <p>Total: {productShops.length > 0 ? totalPrice() : 0} €</p>
                <button className='buttonValidation boutonShop' onClick={()=> handleClick()}>Payer</button>
              </Stack>
            </Grid>

            <Grid item sx={{ background: colorVar.backgroundPaleGrey }} height={{xs:"40%",md:"50%"}} width={{ xs: "100%", md: "45%" }} borderRadius={5}
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