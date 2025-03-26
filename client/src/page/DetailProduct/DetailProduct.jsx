import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApiDetailProduct } from "../../services/callApiProducts";
import { Container, Grid } from "@mui/material";
import View3D from "../../components/View3D/View3D";
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useUserContext } from "../../context/User";
import ButtonUpdateProduct from "../../components/ButtonUpdateProduct/ButtonUpdateProduct.jsx";
import "../DetailProduct/DetailProduct.scss";
import Swal from "sweetalert2";

const DetailProduct = () => {
  const { productId } = useParams();
  const [reload, setReload] = useState(false);
  const [product, setProduct] = useState();
  const { setProductShops } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataProduct();
  }, [productId]);

  useEffect(() => {
    if (reload) {
      fetchDataProduct();
      setReload(false);
    }
  }, [reload]);

  const addProduct = () => {
    Swal.fire({
      text: "Voulez-vous ajouter ce produit au panier ?",
      icon: "info",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setProductShops((allProducts) => [...allProducts, product]);
        Swal.fire({
          text: "Le produit a été ajouté",
          icon: "info",
        });
      }
    });
  };

  const fetchDataProduct = () => {
    setProduct("");
    callApiDetailProduct(productId)
      .then((data) => {
        if (data.data) {
          setProduct(data.data);
        }
      })
      .catch((err) => {
        console.log("error, not found product detail:", err);
      });
  };

  const navigateProfilUser = () => {
    navigate(`/profil/${product.pseudo}`);
  };

  return (
    <>
      {product && (
        <Container
          className="page"
          maxWidth="100vw"
          sx={{ minHeight: "100%", paddingTop: "100px" }}
        >
          <NavigationButton url={-1} />
          <ButtonUpdateProduct
            tags={product.tags}
            name={product.pseudo}
            productId={product.nameFile}
            setReload={setReload}
          />
          <Grid
            container
            gap={3}
            width={{ xs: "90%", md: "85%" }}
            margin={"auto"}
            direction="column"
            color={"white"}
            justifyContent="space-between"
            fontSize={{ xs: "12px", sm: "14px" }}
            sx={{ padding: { md: "0 30px", xs: "0px 10px" } }}
          >
            <View3D modelUrl={product.file.fileUrl} moveBool={true} />

            <Grid
              container
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {product && (
                <>
                  <Grid
                    container
                    direction={"row"}
                    width={"50%"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={2}
                    sx={{ height: "fit-content" }}
                  >
                    <button
                      id="buttonPseudoDetailProduct"
                      onClick={() => {
                        navigateProfilUser();
                      }}
                    >
                      @{product.pseudo.toUpperCase()}
                    </button>
                    <p>{product.download} Téléchargements</p>
                    <p>{product.date}</p>
                  </Grid>
                  <Grid
                    container
                    direction={"row"}
                    gap={3}
                    width={"20%"}
                    justifyContent={"end"}
                    alignItems={"center"}
                    sx={{ height: "fit-content" }}
                  >
                    <p>{product.price} €</p>
                    <div
                      onClick={() => {
                        addProduct();
                      }}
                    >
                      <LocalGroceryStoreIcon
                        sx={{
                          fontSize: { xs: "25px", md: "30px" },
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </Grid>
                </>
              )}
            </Grid>
            <Grid item>
              <p style={{ textDecoration: "underline", paddingBottom: "10px" }}>
                Description:
              </p>
              <p
                style={{
                  maxWidth: "50%",
                  minWidth: "200px",
                  whiteSpace: "normal",
                }}
              >
                {product.description}
              </p>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default DetailProduct;
