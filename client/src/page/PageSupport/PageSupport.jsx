import React, { useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';
import { colorVar } from '../../style/colorVar';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import cguDoc from '../../assets/doc/cgu.txt';
import cgvDoc from '../../assets/doc/cgv.txt'

const PageSupport = () => {
  const [cgu, setCgu] = useState("");
  const [cgv, setCgv] = useState("");

  useEffect(() => {
    fetchDoc(cguDoc, setCgu);
    fetchDoc(cgvDoc, setCgv);
  }, []);

  const fetchDoc = async (doc, varDoc) => {
    try {
      const response = await fetch(doc);
      const data = await response.text(); 
      varDoc(data)
       
    } catch (err) {
      console.error("Error while downloading file: ", err);
    }
  };


  return (
    <Container
      className="page"
      maxWidth="100vw"
      sx={{
        padding: { sm: "0px 40px 0px 0px", xs: "0 0 50px 0" },
        minHeight: "100%",
      }}
    >
      <Stack padding={{ xs: 1, sm: 5 }} alignItems={"center"}>
        <h2 className="secondTitle">Support : </h2>
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
              href="mailto:adresse@email.com"
            >
              nom de l'adresse email
            </a>
            <p style={{ fontSize: "11px" }}>
              *Veuillez à fournir le plus de détail possible suivant la
              problématique rencontrée.
            </p>
          </Stack>
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
                {cgv}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PageSupport;
