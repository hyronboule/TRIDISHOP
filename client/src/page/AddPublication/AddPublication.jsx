import React from 'react'
import "./addPublication.scss"
import { Container, Stack, Grid, Box, Paper } from '@mui/material'
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import InputText from "../../components/InputText/InputText";
import { colorVar } from '../../style/colorVar';


const AddPublication = () => {
  return (
    <>
      <NavigationButton />
      <Container className='page' maxWidth="100vw" sx={{ padding: { sm: " 0px 40px 0px 0px", xs: "0 0 50px 0" }, minHeight: "100%", display: "flex", justifyContent: "center" }} >
        <Stack margin={"0px 20px"} marginTop={8} height={{xs:"80vh", md:"70vh"}} width={{ xs: "100vw", lg: "90vw" }} display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexDirection={"column"}>
          <h1 className="secondTitle" style={{ width: "100%" }}>Nouvelle Publication:</h1>

          <Grid position={"relative"} height={{ xs: "90%"}} width={'100%'} borderRadius={5} padding={{ xs: 3, md: 5, lg: 10 }} container sx={{ background: colorVar.backgroundPaleGrey }} flexDirection={{ xs: "column", md: "row" }} >

            <Grid item width={{ xs: "100%", md: "50%" }} height={{ xs: "40%", md: "100%" }} display={"flex"} flexDirection={"column"} alignItems={{ xs: "center", md: "start" }} justifyContent={{xs:"space-evenly", md:"flex-start"}} gap={{md:18}}>
              <textarea className='inputAddPubli textarea' placeholder='Description...' ></textarea>
              <Stack flexDirection={"row"} gap={5} >
                <InputText placeholder={"Rentrez tags...."} className={"inputAddPubli"} />
                <InputText placeholder={"Prix...."} className={"inputAddPubli"} />
              </Stack>

            </Grid>

            <Grid item width={{ xs: "100%", md: "50%" }} height={{ xs: "45%",md:"60%", lg: "80%" }} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"}>
              <Paper sx={{ width: "100%", maxWidth: "400px", height: "80%", background: "grey" }}></Paper>
              <input type="file" name="file3d" id="file3d" />
            </Grid>
            <button className='buttonValidation'>Publier</button>
          </Grid>
        </Stack>

      </Container>
    </>
  )
}

export default AddPublication