import React, { useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';
import { colorVar } from '../../style/colorVar';

// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import cguDoc from '../../assets/doc/cgu.txt';
// import cgvDoc from '../../assets/doc/cgv.txt'
// import privacyPolicyDoc from '../../assets/doc/privacyPolicy.txt'

const PageSupport = () => {
  // const [cgu, setCgu] = useState("");
  // const [cgv, setCgv] = useState("");
  // const [privacyPolicy, setPrivacyPolicy] = useState("");

  // useEffect(() => {
  //   fetchDoc(cguDoc, setCgu);
  //   fetchDoc(cgvDoc, setCgv);
  //   fetchDoc(privacyPolicyDoc, setPrivacyPolicy);
  // }, []);

  // const fetchDoc = async (doc, varDoc) => {
  //   try {
  //     const response = await fetch(doc);
  //     const data = await response.text(); 
  //     varDoc(data)
       
  //   } catch (err) {
  //     console.error("Error while downloading file: ", err);
  //   }
  // };


  return (
    <Container
      className="page"
      maxWidth="100vw"
      
      sx={{
        minHeight: "100%",
      }}
    >
      <Stack alignItems={"center"}>
        <h1 className="secondTitle">Support : </h1>
        <Stack width={"80vw"}>
          <Stack
            sx={{
              backgroundColor: colorVar.backgroundPaleGrey,
              borderRadius: "20px",
            }}
            width={"max-width"}
            height={{ xs: 200, sm: 100 }}
            marginTop={5}
            padding={2}
            justifyContent={"space-around"}
          >
            <p>
              Bienvenue sur la page support. Pour toute aide , veuillez adresser
              un message à l'adresse mail suivante :
            </p>
            <a
              style={{ color: "#0057c7", textDecoration: "underline" }}
              href={`mailto:${import.meta.env.VITE_EMAIL_SUPPORT}`}
            >
              tridi.help@gmail.com
            </a>
            <p style={{ fontSize: "11px" }}>
              *Veuillez à fournir le plus de détail possible suivant la
              problématique rencontrée.
            </p>
          </Stack>
           {/* cgu accordion
          <Accordion
            sx={{
              backgroundColor: colorVar.backgroundPaleGrey,
              borderRadius: "20px",
              marginTop: 3,
              width: "max-width",
              boxShadow: "none",
              border: "1px solid #e0e0e0",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                color: "#333",
                fontWeight: "bold",
              }}
            >
              <Typography>Ouvrir pour afficher les CGU</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                component="pre"
                border={1}
                borderColor={colorVar.backgroundGrey}
                boxShadow={colorVar.boxShadow}
                padding={2} 
                sx={{
                  whiteSpace: "pre-wrap",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {cgu}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* cgv accordion */}
          {/* <Accordion
            sx={{
              backgroundColor: colorVar.backgroundPaleGrey,
              borderRadius: "20px",
              marginTop: 3,
              width: "max-width",
              boxShadow: "none",
              border: "1px solid #e0e0e0",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                color: "#333",
                fontWeight: "bold",
              }}
            >
              <Typography>Ouvrir pour afficher les CGV</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                component="pre"
                border={1}
                borderColor={colorVar.backgroundGrey}
                boxShadow={colorVar.boxShadow}
                padding={2} 
                sx={{
                  whiteSpace: "pre-wrap",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {cgv}
              </Typography>
            </AccordionDetails>
          </Accordion> */}
          {/* Privacy Policy accordion */}
          {/* <Accordion
            sx={{
              backgroundColor: colorVar.backgroundPaleGrey,
              borderRadius: "20px",
              marginTop: 3,
              width: "max-width",
              boxShadow: "none",
              border: "1px solid #e0e0e0",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                color: "#333",
                fontWeight: "bold",
              }}
            >
              <Typography>Ouvrir pour afficher la politique de confidentialité</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                component="pre"
                border={1}
                borderColor={colorVar.backgroundGrey}
                boxShadow={colorVar.boxShadow}
                padding={2} 
                sx={{
                  whiteSpace: "pre-wrap",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {privacyPolicy}
              </Typography>
            </AccordionDetails>
          </Accordion> */}

        </Stack>
      </Stack>
    </Container>
  );
};

export default PageSupport;
