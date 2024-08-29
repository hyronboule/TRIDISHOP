import React, { useState } from 'react'
import "./login.scss"
import InputText from "../../components/InputText/InputText";
import { Container, Stack } from '@mui/material'
import { colorVar } from '../../style/colorVar'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()

  return (
    <>
      <Container className='page' maxWidth="100vw" sx={{ padding: { xs: "0 0 50px 0", sm: " 0px 40px 0px 0px", lg: "0px 15vw 0px 0px" }, minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "center", gap: 5 }}  >
        <Stack  width={{ xs: "100%", sm: "500px"}} height={{ xs: "450px"}} sx={{ backgroundColor: colorVar.backgroundPaleGrey, borderRadius: "20px" }}>
          <Stack padding={{ xs: 3, sm: 4 }} height={"100%"}>
            <h1 className='titleLogin title'>Connexion</h1>
            <form className='form'>
              <div className='contentForm'>
                <InputText placeholder={"Email..."} className={"inputLogin"} />
                <InputText placeholder={"Mot de passe..."} className={"inputLogin"} />
              </div>
              <button type="submit" className='buttonValidation buttonSignLogin'>Valider</button>
            </form>
          </Stack>
        </Stack>
        <button className='buttonLogin' onClick={()=>{
          navigate("/Sign")
        }}>Inscription</button>
      </Container>

    </>
  )
}

export default Login