import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { colorVar } from "../../style/colorVar";

const Document = ({ doc }) => {
  const [varDoc, setVarDoc] = useState();

  useEffect(() => {
    fetchDoc(doc, setVarDoc);
  }, []);

  const fetchDoc = async (doc, varDoc) => {
    try {
      const response = await fetch(doc);
      const data = await response.text();
      varDoc(data);
    } catch (err) {
      console.error("Error while downloading file: ", err);
    }
  };
  return (
      <Stack
        width={"80%"}
        margin={"auto"}
        sx={{
          background: colorVar.backgroundPaleGrey,
          borderRadius: 3,
          padding: 2,
        }}
      >
        <Typography
          component="pre"
          borderColor={colorVar.backgroundGrey}
          boxShadow={colorVar.boxShadow}
          padding={2}
          sx={{
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {varDoc}
        </Typography>
      </Stack>
  );
};

export default Document;
