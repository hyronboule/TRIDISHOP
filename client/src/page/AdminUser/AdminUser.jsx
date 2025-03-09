import React, { useEffect, useState } from "react";
import { NavbarAdmin } from "../../components/NavbarAdmin/NavbarAdmin";
import { Container, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar";
import { useUserContext } from "../../context/User";
import { getUsers } from "../../services/callApiAdmin";
import {
  callApiRegister,
  callApiUpdateUserAuth,
  deleteUserAccount,
} from "../../services/callApiUserAuth";
import Swal from "sweetalert2";
import { callApiCreateProfilUser, updatedUserProfil } from "../../services/callApiProfilUser";
import { updateNameUserAllProducts } from "../../services/callApiProducts";

const AdminUser = () => {
  const { token } = useUserContext();
  const [users, setUsers] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(false);
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
      setReload(true);
    } else {
      await Swal.fire({
        title: "Erreur lors de la suppression...",
        text: "Contactez le support si le problème persiste",
        icon: "warning",
      });
    }
  };

  const handleUpdateUser = async (userEmail, userPseudo) => {
    const { value: formValues } = await Swal.fire({
      title: "Mettre à jour l'utilisateur",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Nouveau pseudo" />
        <input id="swal-input2" class="swal2-input" placeholder="Nouveau email" />
        <input id="swal-input3" class="swal2-input" placeholder="Nouveau mot de passe" type="password" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          newPseudo: document.getElementById("swal-input1").value,
          newEmail: document.getElementById("swal-input2").value,
          newPassword: document.getElementById("swal-input3").value,
        };
      },
    });

    if (formValues) {
      const { newPseudo, newEmail, newPassword } = formValues;

      if (newPseudo.trim() === "" && newEmail.trim() === "" && newPassword.trim() === "") {
        Swal.fire({
          text: "Erreur, veuillez rentrer au moins une nouvelle donnée",
          icon: "error"
        });
        return;
      }

      // Validation des données
      if (newEmail && !validateEmail(newEmail)) {
        Swal.fire(
          "Erreur",
          "Veuillez renseigner une adresse email valide.",
          "error"
        );
        return;
      }
      if (newPassword && !validatePassword(newPassword)) {
        Swal.fire(
          "Erreur",
          "Le mot de passe doit contenir au moins 8 caractères, avec au moins une majuscule, une minuscule, un chiffre, et un caractère spécial.",
          "error"
        );
        return;
      }

      if (newPseudo && !validatePseudo(newPseudo)) {
        Swal.fire({
          text: "Veuillez renseigner un pseudo valide. 10 caractères max, que de lettres et chiffres",
          icon: "error",
        });
        return;
      }
      let hasError = false;
      let hasUpdate = false;

     

      if (newPseudo) {
        let data = { pseudo: newPseudo };

        try {
          const response = await callApiUpdateUserAuth(data, userEmail, token);

          if (response.status === 400) {
            Swal.fire({
              title: "Erreur sur le pseudo",
              text: response.message,
              icon: "error",
            });
            hasError = true;
          } else {
            await updatedUserProfil(data, userPseudo, token);
            await updateNameUserAllProducts(
              userPseudo,
              newPseudo,
              token
            );
            hasUpdate = true;
          }
        } catch (err) {
          console.error("Erreur lors de la mise à jour du pseudo :", err);
          hasError = true;
        }
      }

      if (newEmail || newPassword) {
       
        let data = {};
        if (newEmail) data.newEmail = newEmail;
        if (newPassword) data.password = newPassword;

        try {
          const response = await callApiUpdateUserAuth(data, userEmail, token);

          if (response.status === 400) {
            Swal.fire({
              title: "Erreur sur l'email ou le mot de passe",
              text: response.message,
              icon: "error",
            });
            hasError = true;
          }else{
            hasUpdate = true;
          }
        } catch (err) {
          console.error(
            "Erreur lors de la mise à jour de l'email ou du mot de passe :",
            err
          );
          Swal.fire(
            "Erreur",
            "Une erreur s'est produite lors de la mise à jour.",
            "error"
          );
          hasError = true;
        }
      }

     if (hasUpdate) {
           Swal.fire({
             title: "Données mises à jour avec succès.",
             text: hasError
               ? "Certaines modifications ont échoué."
               : "Données mise à jour avec succès , aucun problème à signaler",
             icon: "success",
           });
           setReload(true)
         } else if (!hasError) {
           Swal.fire({
             title: "Aucune modification effectuée.",
             icon: "info",
           });
         }
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(password);
  };

  const validatePseudo = (pseudo) => {
    const regex = /^[a-zA-Z0-9]{1,10}$/;
    return regex.test(pseudo);
  };

  const handleAddUser = async () => {
    setReload(false)
    const { value: formValues } = await Swal.fire({
      title: "Ajouter un utilisateur",
      html: `
        <input id="swal-pseudo" class="swal2-input" placeholder="Pseudo (max 10 caractères)">
        <input id="swal-email" class="swal2-input" placeholder="Email">
        <input id="swal-password" type="password" class="swal2-input" placeholder="Mot de passe">
        <select id="swal-role" class="swal2-select">
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Ajouter",
      cancelButtonText: "Annuler",
      preConfirm: () => {
        return {
          pseudo: document.getElementById("swal-pseudo").value.trim(),
          email: document.getElementById("swal-email").value.trim(),
          password: document.getElementById("swal-password").value.trim(),
          role: document.getElementById("swal-role").value,
        };
      },
    });
  
    // Si l'utilisateur annule
    if (!formValues) {
      return Swal.fire({
        text: "Ajout annulé.",
        icon: "info",
      });
    }
  
    const { pseudo, email, password, role } = formValues;
  
    // Vérifications avec tes fonctions
    if (!pseudo || !email || !password || !role) {
      return Swal.fire({
        icon: "error",
        text: "Tous les champs sont obligatoires.",
      });
    }
  
    if (!validateEmail(email)) {
      return Swal.fire({
        icon: "error",
        text: "Format de l'email incorrect.",
      });
    }
  
    if (!validatePassword(password)) {
      return Swal.fire({
        title: "Mot de passe invalide",
        text: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (@, $, !, %, *, ?, &, ou #).",
        icon: "error",
      });
    }
  
    if (!validatePseudo(pseudo)) {
      return Swal.fire({
        text: "Pseudo invalide. 10 caractères max, uniquement lettres et chiffres.",
        icon: "error",
      });
    }
  
    // Confirmation avant enregistrement
    const confirmResult = await Swal.fire({
      title: "Confirmez les informations",
      html: `
        <p><strong>Pseudo :</strong> ${pseudo}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Rôle :</strong> ${role === "admin" ? "Administrateur" : "Utilisateur"}</p>
        <p>Êtes-vous sûr de vouloir ajouter cet utilisateur ?</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Oui, ajouter",
      cancelButtonText: "Annuler",
    });
  
    if (!confirmResult.isConfirmed) {
      return Swal.fire({
        text: "Ajout annulé.",
        icon: "info",
      });
    }
  
    // Ajout de l'utilisateur
    try {
      const registerData = await callApiRegister(pseudo, email, password, role);
      if (!registerData) throw new Error("Échec de l'inscription");
  
      const profileData = await callApiCreateProfilUser(pseudo, email);
      if (!profileData) throw new Error("Échec de la création du profil");
  
      Swal.fire({
        icon: "success",
        text: "Utilisateur ajouté avec succès !",
      });
      setReload(true)
    } catch (error) {
      setReload(false)
      console.error("Erreur lors du processus d'inscription :", error);
      Swal.fire({
        icon: "error",
        text: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
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
        <Stack position={"absolute"} right={50}  top={160}>
          <button className="buttonVitrine" onClick={()=>{
            handleAddUser()
          }}>Ajouter utilisateur</button>
        </Stack>
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
                    <tr key={user._id} style={{
                      color: user.role === "admin" ? "red" : "black",
                    }}>
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
                          onClick={() =>
                            handleUpdateUser(user.email, user.pseudo)
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
