import React from 'react'
import Document from "../../../components/Document/Document";
import pdcDoc from "../../../assets/doc/privacyPolicy.txt";
import { Container, Stack } from "@mui/material";

const Pdc = () => {
  return (
    <Container
      className="page"
      maxWidth="100vw"
      sx={{
        minHeight: "100%",
      }}
    >
    <Stack>
        <h1 style={{paddingBottom:20, textTransform: "uppercase"}} className="secondTitle">Politique de Confidentialité :</h1>
      <Document doc={pdcDoc} />
    </Stack>
    </Container>
  )
}

export default Pdc