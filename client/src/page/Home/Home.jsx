import { Container, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./home.scss";
import React, { useEffect, useState } from "react";
import InputText from "../../components/InputText/InputText.jsx";

import Image3D from "../../components/Image3D/Image3D.jsx";
import {
  callApiAllProducts,
  callApiSearchProduct,
} from "../../services/callApiProducts.js";

const Home = () => {
  const [data, setData] = useState();
  const [productPage, setProductPage] = useState();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    price: null,
  });

  useEffect(() => {
    callApiAllProducts()
      .then((products) => {
        if (products.data) {
          setData(products.data);
          setProductPage(products.urlPage);
        }
      })
      .catch((error) => {
        console.error("Error, not found products:", error);
      });
  }, []);

  const searchProduct = () => {
    callApiSearchProduct(search)
      .then((products) => {
        if (products) {
          if (products.data) {
            setData(products.data);
            setProductPage(products.urlPage);
          }
        } else {
          setData();
          setProductPage();
        }
      })
      .catch((error) => {
        console.error("Error, not found products:", error);
      });
  };

  return (
    <>
      <Container className="page" maxWidth="100vw" sx={{ minHeight: "100%" }}>
        <Grid
          container
          gap={3}
          direction="column"
          justifyContent="space-between"
          sx={{ padding: "0px 30px" }}
        >
          <Grid
            item
            width={"100%"}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: { xs: 2, sm: 3 },
            }}
          >
            <InputText
              placeholder={"Recherche..."}
              className={"inputHome"}
              value={search}
              setValue={setSearch}
              icon={
                <button id="buttonSearch" onClick={() => searchProduct()}>
                  <SearchIcon sx={{ color: "white" }} />
                </button>
              }
            />
            <select
              className="inputHome"
              name="price"
              id="priceProducts"
              onChange={(e) => {
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  price:
                    e.target.value === "null"
                      ? null
                      : e.target.value === "true",
                }));
              }}
            >
              <option value="null">Prix</option>
              <option value="true">Gratuit</option>
              <option value="false">Payant</option>
            </select>
          </Grid>
          <Image3D
            values={data}
            setValues={setData}
            urlPage={productPage}
            setUrlPage={setProductPage}
            filter={filter}
          />
        </Grid>
      </Container>
    </>
  );
};

export default Home;
