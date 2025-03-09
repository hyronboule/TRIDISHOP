import React, { useEffect, useState } from "react"; 
import { useUserContext } from "../../context/User";
import { NavbarAdmin } from "../../components/NavbarAdmin/NavbarAdmin";
import { Container, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar";
import {
  callApiAllProducts,
  callApiPageProducts,
} from "../../services/callApiProducts";
import ProductImage from "../../components/ProductImage/ProductImage";
import { deleteConfirmation } from "../../services/deleteProduct";
import { updateProductForm } from "../../services/updateProduct";


const AdminProduct = () => {
  const { token } = useUserContext();
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setReload(false)
    callApiAllProducts().then((data) => {
      if (data) {
        setProducts(data.data);
        if (data.urlPage) {
          callAllPageProducts(data);
        }
      }
    });
  }, [reload]);

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
    const result = await deleteConfirmation(nameFile, token)
    if (result) {
      setReload(true)
    }
  };

  const handleUpdate = async (nameFile) => {
    const result = await updateProductForm(nameFile, token);
    if (result) {
      setReload(true)
    }
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
                {products && products.length > 0 ? (
                  products.map((product) => (
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
                          onClick={() => handleUpdate(product.nameFile)}
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
        </Stack>
      </Container>
    </>
  );
};

export default AdminProduct;
