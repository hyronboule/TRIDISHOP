import { Container, Stack } from "@mui/material";
import React from "react";
import { NavbarAdmin } from "../../components/NavbarAdmin/NavbarAdmin";

const Admin = () => {
  return (
    <>
      <NavbarAdmin />
      <Container
        id="admin"
        className="page"
        maxWidth="100vw"
        color="white"
        sx={{
          minHeight: "100%",
        }}
      >
        <h1 className="secondTitle">Administration</h1>
        <Stack color={"white"} height={80} justifyContent={"space-between"} marginTop={5}>
            <p>Bienvenue dans l'onglet administration</p>
            <p>Naviguez entre les différentes pages pour accéder au différentes données</p>
        </Stack>
      </Container>
    </>
  );
};

export default Admin;
