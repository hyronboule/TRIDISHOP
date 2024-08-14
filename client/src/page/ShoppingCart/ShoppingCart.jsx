import React from 'react'
import "./shoppingCart.scss"
import { Container, Grid, Stack } from '@mui/material'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import Image3D from '../../components/Image3D/Image3D'
import { colorVar } from '../../style/colorVar'

const ShoppingCart = () => {
  return (
    <Container className='page' maxWidth="100vw" sx={{ padding: { sm: " 0px 40px 0px 0px", xs: "0 0 50px 0" }, minHeight: "100%" }}  >
      <NavigationButton />
      <Grid display={'flex'} justifyContent={"space-between"} flexDirection={"column"} height={"90vh"} paddingTop={8} paddingLeft={2} paddingRight={2} >
        <h1 className='secondTitle' style={{ width: "100%" }}>Panier: </h1>
        <Grid item sx={{ background: colorVar.backgroundPaleGrey }} height={"60%"} width={{ xs: "100%" }} borderRadius={5} padding={2} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
          <Stack sx={{ background: 'blue', height: "85%", overflowY: "scroll"}}>
            <Image3D />
          </Stack>
          <Stack sx={{ background: 'pink', height: "10%" }}>

          </Stack>
        </Grid>
        <Grid item sx={{ background: colorVar.backgroundPaleGrey }} height={"30%"} width={{ xs: "100%" }} borderRadius={5}>

        </Grid >
      </Grid>
    </Container>
  )
}

export default ShoppingCart