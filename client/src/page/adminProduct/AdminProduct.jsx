import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/User";
import { NavbarAdmin } from "../../components/NavbarAdmin/NavbarAdmin";
import { Container, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar";
import {
  callApiAllProducts,
  callApiPageProducts,
  callApiSearchProduct,
} from "../../services/callApiProducts";
import ProductImage from "../../components/ProductImage/ProductImage";
import { deleteConfirmation } from "../../services/deleteProduct";
import { updateProductForm } from "../../services/updateProduct";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import "./adminProduct.scss";
import InputText from "../../components/InputText/InputText";


const AdminProduct = () => {
  const { token } = useUserContext();
  const [products, setProducts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setReload(false);
    callApiAllProducts().then((data) => {
      if (data) {
        setProducts(data.data);
        if (data.urlPage) {
          callAllPageProducts(data);
        }
      }
    });
  }, [reload]);

  useEffect(() => {
    if (products.length > 0) {
      setPaginatedProducts(
        products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }else{
      setPaginatedProducts([])
    }
  }, [products, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const callAllPageProducts = (data) => {
    callApiPageProducts(data.urlPage).then((newData) => {
      if (newData) {
        setProducts((prevProducts) => [...prevProducts, ...newData.data]);
        if (newData.urlPage) {
          callAllPageProducts(newData);
        }
      }
    });
  };

  const handleDelete = async (nameFile) => {
    const result = await deleteConfirmation(nameFile, token);
    if (result) {
      setReload(true);
    }
  };

  const handleUpdate = async (nameFile, tags) => {
    const result = await updateProductForm(nameFile, token, tags);
    if (result) {
      setReload(true);
    }
  };

  const searchProduct = () => {
    callApiSearchProduct(search)
      .then((products) => {
        if (products) {
          if (products.data) {
            setProducts(products.data);
          }
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error, not found products:", error);
      });
  };
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
        <h1 className="secondTitle">Produits des utilisateurs</h1>
        <Stack marginTop={5}>
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
        </Stack>
        <Stack
          color={"white"}
          height={"80%"}
          padding={2}
          justifyContent={"space-between"}
          marginTop={5}
          backgroundColor={colorVar.backgroundPaleGrey}
          borderRadius={5}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "85%",
                color: "black",
                borderCollapse: "collapse",
                margin: "0 auto",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      border: "1px solid #ddd",
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                    }}
                  >
                    ID
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      border: "1px solid #ddd",
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                    }}
                  >
                    Image
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      border: "1px solid #ddd",
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                    }}
                  >
                    Pseudo
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      border: "1px solid #ddd",
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      border: "1px solid #ddd",
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                    }}
                  >
                    Prix
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      border: "1px solid #ddd",
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts && paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <tr key={product._id}>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {product.nameFile}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          width: "80px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        <ProductImage
                          productId={product.nameFile}
                          img={product.image}
                          description={product.description}
                        />
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {product.pseudo}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {product.description}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {product.price} €
                      </td>
                      <td
                        style={{
                          padding: "5px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <button
                          className="buttonVitrine"
                          onClick={() => handleDelete(product.nameFile)}
                        >
                          supprimer
                        </button>
                        <button
                          className="buttonVitrine"
                          onClick={() =>
                            handleUpdate(product.nameFile, product.tags)
                          }
                        >
                          mettre à jour
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        fontStyle: "italic",
                        color: "#999",
                        padding: "12px",
                      }}
                    >
                      Aucun produit trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      </Container>
    </>
  );
};

export default AdminProduct;
