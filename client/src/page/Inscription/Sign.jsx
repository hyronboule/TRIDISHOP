import React, { useState } from 'react'
import "./sign.scss"
import InputText from "../../components/InputText/InputText";
import { Container, Stack } from '@mui/material'
import { colorVar } from '../../style/colorVar'
import { useNavigate } from 'react-router-dom';
import logoTridi from '../../assets/logoTridi.png'
import { callApiLogin, callApiRegister } from '../../services/callApiUserAuth';
import { useUserContext } from '../../context/User';
import Swal from 'sweetalert2';
import { callApiCreateProfilUser } from '../../services/callApiProfilUser';


export const Sign = () => {
  const navigate = useNavigate()

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pseudo, setPseudo] = useState("");
  const { setToken } = useUserContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const pseudoRegex = /^[a-zA-Z0-9]{1,10}$/

    if (!email || !password || !pseudo) {
      Swal.fire({
        icon: 'error',
        text: 'Remplissez tous les champs'
      })
      return;
    }

    // test email regex
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        text: 'Format de l\'email incorrect'
      })
      return;
    }
    // test password regex
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Veuillez renseigner une mot de passe valide.",
        text: 'Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial (@, $, !, %, *, ?, &, ou #).',
        icon: 'error',
      })
      return;
    }
    // test pseudo
    if (!pseudoRegex.test(pseudo)) {
      Swal.fire({
        text: "Veuillez renseigner un pseudo valide. 10 caractères max, que de lettres et chiffres",
        icon: 'error',
      })
      return;
    }

    callApiRegister(pseudo, email, password).then((data) => {
      if (data) {
        // create profil
        callApiCreateProfilUser(pseudo, email).then((data) => {
          if (data) {
            // call api for login user
            callApiLogin(email, password).then((data) => {
              if (data) {
                setToken(data.token);
                navigate('/profil');
              }
            }).catch((error) => {

              console.error('Error during login API call:', error);
            })
          }
        }).catch((err => { console.error('Error during login API call:', err) }))
      }
    }).catch((error) => {
      console.error("error in registration api call", error);
    })
  }


  return (
    <>
      <Container className='page' maxWidth="100vw" sx={{ padding: { xs: "0 0 50px 0", sm: " 0px 40px 0px 0px", lg: "0px 15vw 0px 0px" }, minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "center", gap: 5 }}  >
        <Stack className='logo' flexDirection={"row"} justifyContent={"space-evenly"} alignItems={'center'}>
          <h1 onClick={() => {
            navigate("/")
          }}>TRIDISHOP</h1>
          <img src={logoTridi} />
        </Stack>
        <Stack width={{ xs: "100vw", sm: "500px" }} height={{ xs: "450px" }} sx={{ backgroundColor: colorVar.backgroundPaleGrey, borderRadius: "20px" }}>

          <Stack padding={{ xs: 3, sm: 4 }} height={"100%"}>
            <h1 className='title titleSign' style={{ marginBottom: 20 }}>Inscription</h1>
            <form className='form formSign'>
              <div>
                <InputText placeholder={"Email..."} className={"inputSign"} setValue={setEmail} value={email}
                />
                <InputText placeholder={"Pseudo..."} className={"inputSign"}
                  setValue={setPseudo} value={pseudo} />
                <InputText placeholder={"Mot de passe..."} className={"inputSign"}
                  setValue={setPassword} value={password} type="password" />

              </div>
              <button type="submit" className='buttonValidation buttonSignLogin' onClick={(e) => {
                handleSubmit(e)
              }}>Valider</button>
            </form>
          </Stack>
        </Stack>
        <button className='buttonLogin' onClick={() => {
          navigate("/login")
        }}>Connexion</button>
      </Container>
    </>
  )
}
