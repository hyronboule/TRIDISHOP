import React from 'react'
import "./profil.scss"
import { Container, Grid, Stack } from '@mui/material'
import { colorVar } from '../../style/colorVar.js';
import Select from '../../components/Select/Select.jsx';
import Image3D from '../../components/Image3D/Image3D.jsx';
import NavigationButton from "../../components/NavigationButton/NavigationButton.jsx";
import MenuLinks from '../../components/MenuLinks/MenuLinks.jsx';

const Profil = () => {

  return (
    <>
      <NavigationButton url={"/"} />
      <Container className='page' maxWidth="100vw" sx={{ padding: { xs: "0 0 50px 0", sm: " 0px 40px 0px 0px", lg: "0px 45px 0px 0px" }, minHeight: "100%" }}>
        <Grid container gap={3} direction="column" justifyContent="space-between"  >
          <Grid item width={"100%"} height={200} paddingBottom={3} paddingLeft={{xs:3,md:15,lg:20}} paddingRight={{xs:3,md:15,lg:20}} sx={{ display: "flex", flexDirection: "row", alignItems: {xs:"end", sm:"center"}, justifyContent:"space-between", background: colorVar.backgroundBlue, gap: { xs: 2, sm: 3 } }} >
            <Stack height={{ xs: 90, sm: 150 }} width={{ xs: 90, sm: 150 }} top={{ xs: 60, sm: 100 }} borderRadius={100} border={`2px solid ${colorVar.backgroundPaleBlue}`} className='positionAbsolute' ></Stack>
            
              <h2 id='titleProfil'>@tridi</h2>
              <MenuLinks links={[{
                title: "instagram",
                link:"https://www.instagram.com/_hyrondelle_/",
                icon:""
              }]}/>
            
          </Grid>
          <Grid item className='sidePadding' width={"100%"} sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: { xs: 2, sm: 3 } }} >
            <Select name={"Date"} values={[
              { title: "Date", value: "" },
              { title: "Décroissant", value: "decr" },
              { title: "Croissant", value: "incr" }]} />
          </Grid>
          <Image3D classname="sidePadding" values={[0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2,]} />
        </Grid>
      </Container>
    </>
  )
}

export default Profil