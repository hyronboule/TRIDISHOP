import React from 'react'
import Document from "../../../components/Document/Document";
import cgvDoc from "../../../assets/doc/cgv.txt";
import { Container, Stack } from "@mui/material";
const Cgv = () => {
  return (
    <Container
    className="page"
    maxWidth="100vw"
    sx={{
      minHeight: "100%",
    }}
  >
  <Stack>
      <h1  style={{paddingBottom:20}} className="secondTitle">CONDITIONS GÉNÉRALES DE VENTE (CGV) :</h1>
    <Document doc={cgvDoc} />
  </Stack>
  </Container>
  )
}

export default Cgv