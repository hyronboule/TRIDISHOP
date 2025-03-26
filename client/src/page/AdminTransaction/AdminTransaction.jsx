import React, { useEffect, useState } from "react";
import { NavbarAdmin } from "../../components/NavbarAdmin/NavbarAdmin";
import { Container, Stack } from "@mui/material";
import { useUserContext } from "../../context/User";
import { callApiServiceTransaction } from "../../services/callApiService";
import { colorVar } from "../../style/colorVar";
import TablePagination from "@mui/material/TablePagination";

const AdminTransaction = () => {
  const { token } = useUserContext();
  const [transaction, setTransaction] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [paginatedTransaction, setPaginatedTransaction] = useState([]);

  useEffect(() => {
    callApiServiceTransaction(token).then((data) => {
      if (data) {
        setTransaction(data);
      }
    });
  }, []);

  useEffect(() => {
    if (transaction.length > 0) {
      setPaginatedTransaction(
        transaction.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [transaction, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (date) => {
    if (!date) return "";
  
    const [day, time] = date.split("T"); 
    const formattedDate = day.split("-").reverse().join("/"); 
    const formattedTime = time.split(".")[0].slice(0, 5); 
  
    return `${formattedDate} à ${formattedTime}`;
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
        <h1 className="secondTitle">Transactions</h1>
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
                {paginatedTransaction && paginatedTransaction.length > 0 ? (
                  paginatedTransaction.map((data) => (
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
                          minWidth: "80px",
                        }}
                      >
                        <p>{data.totalAmount} €</p>
                        <p>(frais : {data.totalAmount * 0.05}€ )</p>
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {data.createdAt&& formatDate(data.createdAt)}
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transaction.length}
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

export default AdminTransaction;
