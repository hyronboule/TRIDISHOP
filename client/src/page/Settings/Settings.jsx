import React, { useState } from "react";
import "./settings.scss";
import { Container, Grid, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar";
import NavigationButton from "../../components/NavigationButton/NavigationButton.jsx";
import Swal from "sweetalert2";
import InputText from "../../components/InputText/InputText";
import { updatedUserProfil } from "../../services/callApiProfilUser.js";
import { useUserContext } from "../../context/User.jsx";
import { updateNameUserAllProducts } from "../../services/callApiProducts.js";
import {
  callApiUpdateUserAuth,
  deleteUserAccount,
} from "../../services/callApiUserAuth.js";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [image, setImage] = useState();
  const [linkInstagram, setLinkInstagram] = useState();
  const [newPseudo, setNewPseudo] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [linkFacebook, setLinkFacebook] = useState();
  const [paypalEmail, setPaypalEmail] = useState();
  const [newPassword, setNewPassword] = useState("");
  const { infoUser, setToken, token } = useUserContext();
  const navigate = useNavigate();

  const addImage = (e) => {
    if (e.target.files[0]) {
      let file = e.target.files[0];
      let type = file.name.split(".")[1];
      const ko = 100;
      const maxSize = ko * 1024; // 100 Ko

      if (type === "jpeg" || type === "png") {
        if (file.size > maxSize) {
          Swal.fire({
            icon : "error",
            text: `La taille du fichier ne doit pas dépasser ${ko} Ko.`,
          });
        }else{
          setImage(file);
        }
      } else {
        Swal.fire({
          text: "Veuillez choisir une image au format jpeg ou png.",
          icon: "error",
        });
      }
    }
  };
  const validateUrl = (url) => {
    const regex = /^https?:\/\//;
    return regex.test(url);
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

  const upadateInfoUserProfil = () => {
    if (verifyData()) {
      return;
    }

    let data = {
      instagram: linkInstagram,
      facebook: linkFacebook,
      image: image,
      paypalEmail: paypalEmail,
    };
    updatedUserProfil(data, infoUser.pseudo, token).then((data) => {
      Swal.fire({
        title: data.message,
        icon: data.success ? "success" : "error",
      });
    });

    // reset
    setImage();
    setLinkInstagram();
    setLinkFacebook();
    setPaypalEmail();
  };

  const verifyData = () => {
    if (linkInstagram && !validateUrl(linkInstagram)) {
      Swal.fire({
        text: "Veuillez renseigner un lien d'instagram valide.",
        icon: "error",
      });
      return true;
    }
    if (linkFacebook && !validateUrl(linkFacebook)) {
      Swal.fire({
        text: "Veuillez renseigner un lien facebook valide.",
        icon: "error",
      });
      return true;
    }

    if (paypalEmail && !validateEmail(paypalEmail)) {
      Swal.fire({
        text: "Veuillez renseigner une email paypal valide.",
        icon: "error",
      });
      return true;
    }
    return false;
  };
  const updatedUser = async () => {
    if (newEmail && !validateEmail(newEmail)) {
      Swal.fire({
        text: "Veuillez renseigner une email valide.",
        icon: "error",
      });
      return;
    }
    if (newPassword && !validatePassword(newPassword)) {
      Swal.fire({
        title: "Veuillez renseigner une mot de passe valide.",
        text: "Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial (@, $, !, %, *, ?, &, ou #).",
        icon: "error",
      });
      return;
    }
    if (newPseudo && !validatePseudo(newPseudo)) {
      Swal.fire({
        text: "Veuillez renseigner un pseudo valide. 10 caractères max, que de lettres et chiffres",
        icon: "error",
      });
      return;
    }
    let pseudoUser = infoUser.pseudo;
    let emailUser = infoUser.email;
    let hasError = false;
    let hasUpdate = false;

    if (newPseudo) {
      let data = { pseudo: newPseudo };

      try {
        const response = await callApiUpdateUserAuth(data, emailUser, token);

        if (response.status === 400) {
          Swal.fire({
            title: "Erreur sur le pseudo",
            text: response.message,
            icon: "error",
          });
          hasError = true;
        } else {
          await updatedUserProfil(data, pseudoUser, token);
          await updateNameUserAllProducts(pseudoUser, newPseudo, token);

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
        const response = await callApiUpdateUserAuth(data, emailUser, token);

        if (response.status === 400) {
          Swal.fire({
            title: "Erreur sur l'email ou le mot de passe",
            text: response.message,
            icon: "error",
          });
          hasError = true;
        } else {
          hasUpdate = true;
        }
      } catch (err) {
        console.error(
          "Erreur lors de la mise à jour de l'email ou du mot de passe :",
          err
        );
        hasError = true;
      }
    }

    if (hasUpdate) {
      Swal.fire({
        title: "Données mises à jour avec succès.",
        text: hasError
          ? "Certaines modifications ont échoué. Reconnexion obligatoire pour appliquer les changements réussis."
          : "Reconnexion obligatoire pour appliquer les changements.",
        icon: "success",
      });

      setNewPseudo("");
      setNewEmail("");
      setNewPassword("");

      setToken();
      navigate("/login");
    } else if (!hasError) {
      Swal.fire({
        title: "Aucune modification effectuée.",
        icon: "info",
      });
    }
  };

  const handleValidation = () => {
    if (linkInstagram || linkFacebook || image || paypalEmail) {
      upadateInfoUserProfil();
    } else if (newPseudo || newEmail || newPassword) {
      updatedUser();
    } else {
      Swal.fire({
        text: "Veuillez renseigner au moins une information à modifier",
        icon: "error",
      });
    }
  };

  const deleteAccount = async () => {
    const confirm1 = await Swal.fire({
      text: "Voulez-vous supprimer votre compte ?",
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

    if (!token || !infoUser.email.trim() || !infoUser.id) {
      await Swal.fire({
        icon: "warning",
        text: `Il manque ${
          !token
            ? "le token"
            : !infoUser.email.trim()
            ? "l'email de l'utilisateur"
            : "l'id de l'utilisateur"
        }`,
      });
      return;
    }

    const result = await deleteUserAccount(token, infoUser.email, infoUser.id);

    if (result) {
      await Swal.fire({
        text: "Votre compte a bien été supprimé",
        icon: "success",
      });
      setToken();
      navigate("/");
    } else {
      await Swal.fire({
        title: "Erreur lors de la suppression...",
        text: "Contactez le support si le problème persiste",
        icon: "warning",
      });
    }
  };

  return (
    <Container
      className="page settings"
      maxWidth="100vw"
      display="flex"
      align="center"
      sx={{ minHeight: "100%" }}
    >
      <h1>Settings :</h1>

      <Stack
        sx={{
          background: colorVar.backgroundPaleGrey,
          width: { xs: "70vw", md: "80vw" },
          //  height: { xs: '70vh', md: '60vh' },
          borderRadius: "20px",
          padding: { xs: "0 20px", sm: "0 50px" },
        }}
        flexDirection={"column"}
        justifyContent={"space-between"}
        gap={2}
      >
        <Grid
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={{ xs: "center", md: "start" }}
          width={"100%"}
          height={200}
          flexWrap={"wrap"}
          gap={{ xs: 2, sm: 5 }}
        >
          <Stack
            sx={{
              width: { sm: "100%", xs: "250px" },
              maxWidth: "200px",
              height: { xs: "50%", sm: "60%" },
              background: "grey",
              marginTop: "10px",
              borderRadius: 3,
            }}
          >
            {image && (
              <img
                alt="image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                src={URL.createObjectURL(image)}
              />
            )}
          </Stack>
          <div className="inputSettings">
            <label htmlFor="image" className="labelAddFile">
              {image ? image.name : "Importer image de profil (jpeg ou png)"}
            </label>
            <input
              type="file"
              accept=".jpeg,.png"
              name="image"
              id="image"
              onChange={(e) => {
                setImage();
                addImage(e);
              }}
              style={{ display: "none" }}
            />
          </div>
        </Grid>
        <Stack>
          <p style={{ textAlign: "start", textDecoration: "underline" }}>
            Vos informations personnelles:
          </p>
          <InputText
            placeholder={"Pseudo"}
            className={"inputTextSettings"}
            disabled
            value={newPseudo}
            setValue={setNewPseudo}
          />
          <InputText
            placeholder={"Email"}
            className={"inputTextSettings"}
            disabled
            value={newEmail}
            setValue={setNewEmail}
          />
          <InputText
            placeholder={"Mot de passe"}
            className={"inputTextSettings"}
            disabled
            value={newPassword}
            setValue={setNewPassword}
            type={"password"}
          />
        </Stack>
        <Stack>
          <p style={{ textAlign: "start", textDecoration: "underline" }}>
            Liens de profil:
          </p>
          <InputText
            placeholder={"Rentrez un lien instagram..."}
            className={"inputTextSettings"}
            value={linkInstagram}
            setValue={setLinkInstagram}
          />
          <InputText
            placeholder={"Rentrez un lien facebook..."}
            className={"inputTextSettings"}
            value={linkFacebook}
            setValue={setLinkFacebook}
          />
        </Stack>
        <Stack>
          <p style={{ textAlign: "start", textDecoration: "underline" }}>
            Modifier email Paypal du compte:{" "}
          </p>
          <InputText
            placeholder={"Rentrez votre email Paypal..."}
            className={"inputTextSettings"}
            value={paypalEmail}
            setValue={setPaypalEmail}
          />
        </Stack>
        <Stack flexDirection={"row"} gap={2} justifyContent={"flex-end"}>
          <button
            onClick={() => deleteAccount()}
            className="buttonValidation buttonSettings"
            style={{
              position: "inherit",
              margin: "20px 0px",
              background: "#a92c2c",
              color: "white",
            }}
          >
            Supprimer compte
          </button>
          <button
            className="buttonValidation buttonSettings"
            style={{
              position: "inherit",
              margin: "20px 0px",
            }}
            onClick={handleValidation}
          >
            Valider
          </button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Settings;
