import React from "react";
import Document from "../../../components/Document/Document";
import cguDoc from "../../../assets/doc/cgu.txt";
import { Container, Stack } from "@mui/material";
const Cgu = () => {
  return (
    <Container
      className="page"
      maxWidth="100vw"
      sx={{
        minHeight: "100%",
      }}
    >
    <Stack>
        <h1 style={{paddingBottom:20}} className="secondTitle">CONDITIONS GÉNÉRALES D'UTILISATION (CGU) :</h1>
      <Document doc={cguDoc} />
    </Stack>
    </Container>
  );
};

export default Cgu;
