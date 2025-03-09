import React, { useEffect, useState } from "react";
import { NavbarAdmin } from "../../components/NavbarAdmin/NavbarAdmin";
import { Container, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar";
import { useUserContext } from "../../context/User";
import { getUsers } from "../../services/callApiAdmin";
import { deleteUserAccount } from "../../services/callApiUserAuth";
import Swal from "sweetalert2";

const AdminUser = () => {
  const { token } = useUserContext();
  const [users, setUsers] = useState();
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setReload(false)
    getUsers(token).then((data) => {
      if (data) {
        setUsers(data);
      }
    });
  }, [reload]);

  const deleteAccount = async (userId, email) => {
    const confirm1 = await Swal.fire({
      text: "Voulez-vous supprimer ce compte ?",
      icon: "warning",
      confirmButtonText: "Confirmer",
      showCancelButton: true,
    });

    if (!confirm1.isConfirmed) return;

    const confirm2 = await Swal.fire({
      text: "Vous êtes sûr ?",
      icon: "warning",
      confirmButtonText: "Confirmer",
      showCancelButton: true,
    });

    if (!confirm2.isConfirmed) return;

    if (!token || !email.trim() || !userId) {
      await Swal.fire({
        icon: "warning",
        text: `Il manque ${
          !token
            ? "le token"
            : !email.trim()
            ? "l'email de l'utilisateur"
            : "l'id de l'utilisateur"
        }`,
      });
      return;
    }

    const result = await deleteUserAccount(token, email, userId);

    if (result) {
      await Swal.fire({
        text: "Ce compte a bien été supprimé",
        icon: "success",
      });
      setReload(true)
    } else {
      await Swal.fire({
        title: "Erreur lors de la suppression...",
        text: "Contactez le support si le problème persiste",
        icon: "warning",
      });
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
        <h1 className="secondTitle">Compte utilisateurs</h1>
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
                    Role
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
                    Email
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {user.pseudo}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {user.role}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "left",
                          border: "1px solid #ddd",
                        }}
                      >
                        {user.email}
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
                          onClick={() => deleteAccount(user._id, user.email)}
                        >
                          supprimer
                        </button>
                        <button
                          className="buttonVitrine"
                          //   onClick={() => }
                        >
                          mettre à jour
                        </button>
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
                      Aucun utilisateur trouvé
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

export default AdminUser;
