import React, { useEffect, useState } from "react";
import { NavbarAdmin } from "../../components/NavbarAdmin/NavbarAdmin";
import { Container, Stack } from "@mui/material";
import { useUserContext } from "../../context/User";
import { callApiServiceTransaction } from "../../services/callApiService";
import { colorVar } from "../../style/colorVar";

const AdminTransaction = () => {
  const { token } = useUserContext();
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    callApiServiceTransaction(token).then((data) => {
      if (data) {
        setTransaction(data);
      }
    });
  }, []);

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
        <h1 className="secondTitle">Transactions</h1>
        <Stack
          color={"white"}
          height={"80%"}
          padding={2}
          justifyContent={"space-between"}
          marginTop={13}
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
                    id
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
                    Acheteur
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
                    Total
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
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaction && transaction.length > 0 ? (
                  transaction.map((data) => (
                    <tr key={data._id}>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                       {data.transactionId}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {data.buyer.email
                          ? data.buyer.email
                          : "Acheteur inconnu"}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {data.totalAmount}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {data.createdAt}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        textAlign: "center",
                        fontStyle: "italic",
                        color: "#999",
                        padding: "12px",
                      }}
                    >
                      Aucune transaction trouvée
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

export default AdminTransaction;
