import React, { useState } from "react";
import "./login.scss";
import InputText from "../../components/InputText/InputText";
import { Container, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar";
import { useNavigate } from "react-router-dom";
import logoTridi from "../../assets/logoTridi.png";
import { callApiLogin } from "../../services/callApiUserAuth";
import { useUserContext } from "../../context/User";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!email || !password) {
      Swal.fire({
        text: `Entrez un ${!email ? "email" : "mot de passe"}`,
        icon: "error",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        text: "Format de l'email incorrect",
      });
      return;
    }
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Mot de passe invalide",
        text: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial (@, $, !, %, *, ?, &, ou #).",
        icon: "error",
      });
      return;
    }

    callApiLogin(email, password)
      .then((data) => {
        if (typeof data !== "string") {
          setToken(data.token);
          navigate("/profil");
        } else {
          Swal.fire({
            text: data,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error during login API call:", error);
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
            role="button"
            tabIndex={0}
            onClick={() => {
              navigate("/products");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/products");
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
          <Stack padding={{ xs: 3, sm: 4 }} height={"100% !important"}>
            <h1 className="titleLogin title">Connexion</h1>
            <form className="form">
              <div className="contentForm">
                <InputText
                  placeholder={"Email..."}
                  className={"inputLogin"}
                  setValue={setEmail}
                  value={email}
                />
                <InputText
                  placeholder={"Mot de passe..."}
                  className={"inputLogin"}
                  setValue={setPassword}
                  value={password}
                  type="password"
                />
              </div>
              <button
                type="submit"
                className="buttonValidation buttonSignLogin"
                onClick={(e) => handleSubmit(e)}
              >
                Valider
              </button>
            </form>
          </Stack>
        </Stack>
        <button
          className="buttonLogin"
          onClick={() => {
            navigate("/sign");
          }}
        >
          Inscription
        </button>
      </Container>
    </>
  );
};

export default Login;
