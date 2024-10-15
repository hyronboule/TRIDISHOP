import React, { useEffect, useState } from 'react'
import "./profil.scss"
import { Container, Grid, Stack } from '@mui/material'
import { colorVar } from '../../style/colorVar.js';
import Select from '../../components/Select/Select.jsx';
import Image3D from '../../components/Image3D/Image3D.jsx';
import NavigationButton from "../../components/NavigationButton/NavigationButton.jsx";
import MenuLinks from '../../components/MenuLinks/MenuLinks.jsx';
import { useUserContext } from '../../context/User.jsx';
import { callApiProductsUser } from '../../services/callApiProducts.js';
import { apiCallUserProfil } from '../../services/callApiProfilUser.js';



const Profil = () => {
  const { infoUser } = useUserContext()
  const [productsUser, setProductsUser] = useState()
  const [profilUser, setProfilUser] = useState()
  const [productPage, setProductPage] = useState()

  useEffect(() => {
    if (infoUser.pseudo) {
      // retrieve the user's profile image
      apiCallUserProfil(infoUser.pseudo).then((data) => {
        if (data) {
          setProfilUser(data)
        }
      }).catch((error) => {
        console.error('Error fetching info user:', error);
      })
      // retrieve the user's products
      callApiProductsUser(infoUser.pseudo).then((data) => {
        if (data) {
          setProductsUser(data.data)
          
          setProductPage(data.urlPage)
        }
      }).catch((error) => {
        console.error('Error fetching products:', error);
      })
    }
   
  }, [infoUser])

  return (
    <>
      <NavigationButton url={"/"} />
      <Container className='page' maxWidth="100vw" sx={{ padding: { xs: "0 0 50px 0", sm: " 0px 40px 0px 0px", lg: "0px 45px 0px 0px" }, minHeight: "100%" }}>
        <Grid container gap={3} direction="column" justifyContent="space-between"  >
          <Grid item width={"100%"} height={200} paddingBottom={3} paddingLeft={{ xs: 3, md: 15, lg: 20 }} paddingRight={{ xs: 3, md: 15, lg: 20 }} sx={{ display: "flex", flexDirection: "row", alignItems: { xs: "end", sm: "center" }, justifyContent: "space-between", background: colorVar.backgroundBlue, gap: { xs: 2, sm: 3 } }} >
            <Stack height={{ xs: 90, sm: 150 }} width={{ xs: 90, sm: 150 }} top={{ xs: 60, sm: 100 }} borderRadius={100} border={`2px solid ${colorVar.backgroundPaleBlue}`} className='positionAbsolute' >
              {profilUser && <img className='imgProfile' src={profilUser.image} alt="image profile" />}
            </Stack>

            <h2 id='titleProfil'>{`@${infoUser.pseudo}`}</h2>
            {profilUser && profilUser.links && (
              <MenuLinks links={[
                profilUser.links.instagram && {
                  title: "Instagram",
                  link: profilUser.links.instagram,
                  icon: ""
                },
                profilUser.links.facebook && {
                  title: "Facebook",
                  link: profilUser.links.facebook,
                  icon: ""
                },
              ].filter(Boolean)} />
            )}

          </Grid>
          {/* <Grid item className='sidePadding' width={"100%"} sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: { xs: 2, sm: 3 } }} >
            <Select name={"Date"} values={[
              { title: "Date", value: "" },
              { title: "Décroissant", value: "decr" },
              { title: "Croissant", value: "incr" }]} />
          </Grid> */}

          <Image3D classname="sidePadding"
            values={productsUser}
            setValues={setProductsUser} 
            urlPage={productPage}
            setUrlPage={setProductPage}
            />

        </Grid>
      </Container>
    </>
  )
}

export default Profil