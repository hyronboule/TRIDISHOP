import React, { useState } from "react";
import "./sign.scss";
import InputText from "../../components/InputText/InputText";
import { Container, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar";
import { useNavigate } from "react-router-dom";
import logoTridi from "../../assets/logoTridi.png";
import { callApiLogin, callApiRegister } from "../../services/callApiUserAuth";
import { useUserContext } from "../../context/User";
import Swal from "sweetalert2";
import { callApiCreateProfilUser } from "../../services/callApiProfilUser";

export const Sign = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pseudo, setPseudo] = useState("");
  const { setToken } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const pseudoRegex = /^[a-zA-Z0-9]{1,10}$/;

    if (!email || !password || !pseudo) {
      Swal.fire({
        icon: "error",
        text: "Remplissez tous les champs",
      });
      return;
    }

    // test email
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        text: "Format de l'email incorrect",
      });
      return;
    }

    // test password
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Mot de passe invalide",
        text: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial (@, $, !, %, *, ?, &, ou #).",
        icon: "error",
      });
      return;
    }

    // test pseudo
    if (!pseudoRegex.test(pseudo)) {
      Swal.fire({
        text: "Pseudo invalide. 10 caractères max, uniquement lettres et chiffres.",
        icon: "error",
      });
      return;
    }

    // Confirmation avant l'enregistrement
    Swal.fire({
      title: "Confirmez votre email",
      text: `Vous avez renseigné l'email : ${email}. Vérifiez bien qu'il est correct avant de continuer.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Oui, continuer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        // register user as confirmed
        callApiRegister(pseudo, email, password, "user")
          .then((data) => {
            if (data) {
              // create profil
              callApiCreateProfilUser(pseudo, email)
                .then((data) => {
                  if (data) {
                    // call api for login user
                    // callApiLogin(email, password)
                    //   .then((data) => {
                    //     if (data) {
                    //       setToken(data.token);
                    //       navigate("/profil");
                    //     }
                    //   })
                    //   .catch((error) => {
                    //     console.error("Error during login API call:", error);
                    //   });

                   Swal.fire({
                    icon :"success",
                    text : "Votre compte est créé. Un email de vérification vous a été envoyé."
                   })
                  }
                })
                .catch((err) => {
                  console.error("Error during profile creation API call:", err);
                });
            }
          })
          .catch((error) => {
            console.error("Error in registration API call", error);
          });
      } else {
        Swal.fire({
          text: "L'enregistrement a été annulé. Vérifiez vos informations avant de recommencer.",
          icon: "info",
        });
      }
    });
  };

  return (
    <>
      <Container
        className="page"
        maxWidth="100vw"
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyContent: "flex-start",
          gap: 5,
        }}
      >
        <Stack
          className="logo"
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <h1
            tabIndex={0}
            onClick={() => {
              navigate("/home");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/");
              }
            }}
          >
            TRIDISHOP
          </h1>
          <img src={logoTridi} />
        </Stack>
        <Stack
          className="formSign"
          width={{ xs: "100%", sm: "500px" }}
          height={{ xs: "450px" }}
          sx={{
            backgroundColor: colorVar.backgroundPaleGrey,
            borderRadius: "20px",
          }}
        >
          <Stack padding={{ xs: 3, sm: 4 }} height={"100% !important"} >
            <h1 className="title titleSign" style={{ marginBottom: 20 }}>
              Inscription
            </h1>
            <form className="form formSign">
              <div>
                <InputText
                  placeholder={"Email..."}
                  className={"inputSign"}
                  setValue={setEmail}
                  value={email}
                />
                <InputText
                  placeholder={"Pseudo..."}
                  className={"inputSign"}
                  setValue={setPseudo}
                  value={pseudo}
                />
                <InputText
                  placeholder={"Mot de passe..."}
                  className={"inputSign"}
                  setValue={setPassword}
                  value={password}
                  type="password"
                />
              </div>
              <button
                type="submit"
                className="buttonValidation buttonSignLogin"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Valider
              </button>
            </form>
          </Stack>
        </Stack>
        <button
          className="buttonLogin"
          onClick={() => {
            navigate("/login");
          }}
        >
          Connexion
        </button>
      </Container>
    </>
  );
};
