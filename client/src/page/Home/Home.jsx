import { Container, Grid, Paper } from '@mui/material'
import { colorVar } from "../../style/colorVar.js";
import SearchIcon from '@mui/icons-material/Search';
import NavigationButton from "../../components/NavigationButton/NavigationButton"
import "./home.scss"
import React from 'react'
import InputText from '../../components/InputText/InputText.jsx';
import Select from '../../components/Select/Select.jsx';
import Image3D from '../../components/Image3D/Image3D.jsx';


const Home = () => {
  return (
    <>
      <Container className='page' maxWidth="100vw" sx={{ padding: { sm: " 0px 40px 0px 0px", xs: "0 0 50px 0" }, minHeight: "100%" }}  >
        <Grid container gap={3} direction="column" justifyContent="space-between" sx={{ padding: "0px 30px", paddingTop: 5 }} >
          <Grid item width={"100%"}  sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: { xs: 2, sm: 3 } }} >
            <InputText placeholder={"Recherche..."} className={"inputHome"} icon={<SearchIcon sx={{color:"white"}}  />} />
            <Select name={"Date"} values={[
              { title: "Date", value: "" },
              { title: "Décroissant", value: "decr" },
              { title: "Croissant", value: "incr" }]} />
          </Grid>
          <Image3D values={[0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2,]}/>
        </Grid>
      </Container>
    </>
  )
}

export default Home