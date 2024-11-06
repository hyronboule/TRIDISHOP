import React, { useState } from 'react'
import "./settings.scss"
import { Container, Grid, Stack } from '@mui/material'
import { colorVar } from '../../style/colorVar'
import NavigationButton from "../../components/NavigationButton/NavigationButton.jsx";
import Swal from 'sweetalert2';
import InputText from '../../components/InputText/InputText';
import { updatedUserProfil } from '../../services/callApiProfilUser.js';
import { useUserContext } from '../../context/User.jsx';

const Settings = () => {

  const [image, setImage] = useState()
  const [linkInstagram, setLinkInstagram] = useState()
  const [linkFacebook, setLinkFacebook] = useState()
  const [paypalEmail, setPaypalEmail] = useState()
  const { infoUser } = useUserContext()

  const addImage = (e) => {
    if (e.target.files[0]) {
      let file = e.target.files[0]
      let type = file.name.split('.')[1]
      console.log(type);

      if (type === 'jpeg' || type === 'png') {
        setImage(file)
      } else {
        Swal.fire({
          text: "Veuillez choisir une image au format jpeg ou png.",
          icon: 'error',
        })
      }
    }
  }
  const validateUrl = (url) => {
    const regex = /^https?:\/\//;
    return regex.test(url);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const upadateInfoUser = () => {
    if (verifyData()){
      return ;
    }

    let data = {
      instagram: linkInstagram,
      facebook: linkFacebook,
      image: image,
      paypalEmail: paypalEmail
    }
    updatedUserProfil(data, infoUser.pseudo).then((data) => {
      Swal.fire({
        title: data.message,
        icon: data.success ? 'success' : "error",
      })
    })

    // reset
    setImage()
    setLinkInstagram()
    setLinkFacebook()
    setPaypalEmail()
  }

  const verifyData = () => {
    if (linkInstagram && !validateUrl(linkInstagram)) {
      Swal.fire({
        text: "Veuillez renseigner un lien d'instagram valide.",
        icon: 'error',
      })
      return true
    }
    if (linkFacebook && !validateUrl(linkFacebook)) {
      Swal.fire({
        text: "Veuillez renseigner un lien facebook valide.",
        icon: 'error',
      })
      return true
    }

    if (paypalEmail && !validateEmail(paypalEmail)) {
      Swal.fire({
        text: "Veuillez renseigner une email paypal valide.",
        icon: 'error',
      })
      return true
    }
    return false;
  }

  return (
    <Container className='page settings'
      maxWidth="100vw" display='flex' align='center'
      sx={{ padding: { sm: " 50px 40px 0px 0px", xs: "50px 0 50px 0" }, minHeight: "100%" }}  >
      <NavigationButton url={'/'} />
      <h1>Settings :</h1>

      <Stack sx={{ background: colorVar.backgroundPaleGrey, width: { xs: '70vw', md: '80vw' }, height: { xs: '70vh', md: '60vh' }, borderRadius: "20px", padding: { xs: '0 20px', sm: '0 50px' } }} flexDirection={'column'} justifyContent={'space-between'} >

        <Grid display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={{ xs: 'center', md: 'start' }} width={'100%'} height={200} flexWrap={'wrap'} gap={{ xs: 2, sm: 5 }}>
          <Stack sx={{ width: { sm: "100%", xs: "250px" }, maxWidth: "200px", height: { xs: "50%", sm: "60%" }, background: "grey", marginTop: "10px", borderRadius: 3 }}>
            {
              image && (
                <img alt="image" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: '10px' }} src={URL.createObjectURL(image)} />
              )
            }
          </Stack>
          <div className='inputSettings'>
            <label htmlFor="image" className='labelAddFile'>{image ? image.name : "Importer image de profil (jpeg ou png)"}</label>
            <input type="file" name="image" id="image"
              onChange={(e) => {
                setImage()
                addImage(e)
              }} style={{ display: 'none' }} />
          </div>
        </Grid>

        <Stack>
          <p style={{ textAlign: 'start', textDecoration: 'underline' }}>Liens de profil:</p>
          <InputText placeholder={'Rentrez un lien instagram...'} className={'inputTextSettings'}
            value={linkInstagram} setValue={setLinkInstagram} />
          <InputText placeholder={'Rentrez un lien facebook...'} className={'inputTextSettings'}
            value={linkFacebook} setValue={setLinkFacebook} />
          <InputText placeholder={'Rentrez votre email Paypal...'} className={'inputTextSettings'}
            value={paypalEmail} setValue={setPaypalEmail} />
        </Stack>

        <button className='buttonValidation buttonSettings' style={{ position: 'inherit', margin: '20px 0px', marginLeft: 'auto' }} onClick={() => {
          linkInstagram || linkFacebook || image || paypalEmail ? upadateInfoUser() :
            Swal.fire({
              text: "Veuillez renseigner au moins un lien d'instagram ou facebook ou une image de profil.",
              icon: 'error',
            })

        }}>Valider</button>
      </Stack>
    </Container>
  )
}

export default Settings