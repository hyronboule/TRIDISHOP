import React, { useState } from 'react'
import "./sign.scss"
import InputText from "../../components/InputText/InputText";
import { Container, Stack } from '@mui/material'
import { colorVar } from '../../style/colorVar'
import { useNavigate } from 'react-router-dom';


export const Sign = () => {
  const navigate = useNavigate()

  const [email, setEmail] = React.useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = React.useState("");
  const [pseudo, setPseudo] = useState("");
  return (
    <>
      <Container className='page' maxWidth="100vw" sx={{ padding: { xs: "0 0 50px 0", sm: " 0px 40px 0px 0px", lg: "0px 15vw 0px 0px" }, minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "center", gap: 5 }}  >
        <Stack  width={{ xs: "100vw", sm: "500px"}} height={{ xs: "450px"}} sx={{ backgroundColor: colorVar.backgroundPaleGrey, borderRadius: "20px" }}>
          
          <Stack padding={{ xs: 3, sm: 4 }} height={"100%"}>
            <h1 className='title'style={{marginBottom:20}}>Inscription</h1>
            <form className='form formSign'>
              <div>
                <InputText placeholder={"Email..."} className={"inputSign"}
                />
                <InputText placeholder={"Pseudo..."} className={"inputSign"} />
                <InputText placeholder={"Mot de passe..."} className={"inputSign"} />
                <input className='inputSign dateSign' type="date" id="dateBirth" name="dateBirth" value={date} min="1950-01-01" max="2020-12-31" onChange={(e) => {
                  setDate(e.target.value);
                }} />

              </div>
              <button type="submit" className='buttonValidation'>Valider</button>
            </form>
          </Stack>
        </Stack>
        <button className='buttonLogin' onClick={() => {
          navigate("/Login")
        }}>Connexion</button>
      </Container>
    </>
  )
}