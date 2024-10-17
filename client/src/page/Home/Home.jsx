import { Container, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import "./home.scss"
import React, { useEffect, useState } from 'react'
import InputText from '../../components/InputText/InputText.jsx';
import Select from '../../components/Select/Select.jsx';
import Image3D from '../../components/Image3D/Image3D.jsx';
import { callApiAllProducts, callApiSearchProduct } from '../../services/callApiProducts.js';


const Home = () => {
  const [data, setData] = useState()
  const [productPage, setProductPage] = useState()
  const [search, setSearch] = useState("")

  useEffect(() => {
    callApiAllProducts().then((products) => {
      if (products.data) {
        setData(products.data)
        setProductPage(products.urlPage)
      }
    }).catch((error) => {
      console.error("Error, not found products:", error);
    });
  }, [])

  const searchProduct = () => {
    callApiSearchProduct(search).then((products) => {
      if (products) {
        if (products.data) {
          setData(products.data)
          setProductPage(products.urlPage)
        }
      }
      else {
        setData()
        setProductPage()
      }
    }).catch((error) => {
      console.error("Error, not found products:", error);
    });
  }

  return (
    <>
      <Container className='page' maxWidth="100vw" sx={{ padding: { sm: " 0px 40px 0px 0px", xs: "0 0 50px 0" }, minHeight: "100%" }}  >
        <Grid container gap={3} direction="column" justifyContent="space-between" sx={{ padding: "0px 30px", paddingTop: 5 }} >
          <Grid item width={"100%"} sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: { xs: 2, sm: 3 } }} >
            <InputText placeholder={"Recherche..."} className={"inputHome"} value={search} setValue={setSearch} icon={
              <button id='buttonSearch' onClick={() => searchProduct()}>
                <SearchIcon sx={{ color: "white" }} />
              </button>
            } />
            {/* <Select name={"Date"} values={[
              { title: "Date", value: "" },
              { title: "Décroissant", value: "decr" },
              { title: "Croissant", value: "incr" }]} /> */}
          </Grid>
          <Image3D
            values={data}
            setValues={setData}
            urlPage={productPage}
            setUrlPage={setProductPage} />
        </Grid>
      </Container>
    </>
  )
}

export default Home