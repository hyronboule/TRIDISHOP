import { Container, Grid, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar.js";
colorVar;
import "./footer.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoTridi.png";
import { useUserContext } from "../../context/User.jsx";

function Footer() {
  const {setDisplayCookies} = useUserContext()
  const navigate = useNavigate();
  return (
    <footer>
      <Container className={"footer"}>
        <Grid
          container
          flexDirection={{ xs: "column", sm: "row" }}
          height={100}
          justifyContent={"space-between"}
        >
          <Grid
            item
            sm={4}
            md={3}
            borderRight={{ lg: "1px solid #B1E5F2" }}
            alignContent={"center"}
          >
            <ul className="linksFooter">
              <li
                className="hoverLink"
                onClick={() => {
                  navigate("/cgu ");
                }}
              >
                Conditions générales d'utilisation
              </li>
              <li
                className="hoverLink"
                onClick={() => {
                  navigate("/cgv ");
                }}
              >
                Conditions générales de vente
              </li>
              <li
                className="hoverLink"
                onClick={() => {
                  navigate("/pdc ");
                }}
              >
                Politique de confidentialité
              </li>
            </ul>
          </Grid>
          <Grid item sm={2} alignContent={"center"}>
            <ul className="linksFooter">
              <li
                className="hoverLink"
                onClick={() => {
                  navigate("/");
                }}
              >
               À propos de nous
              </li>
              <li
                className="hoverLink"
                onClick={() => {
                  setDisplayCookies(true)
                }}
              >
               Gérer cookies
              </li>
            </ul>
          </Grid>
          <Grid sm={4} display={{ xs: "none", sm: "block" }}>
            <Stack id="infoEntreprise">
              <img src={logo} alt="Logo de tridishop" />
              <h1>TridiShop</h1>
            </Stack>
          </Grid>
        </Grid>
        <Stack
          color={"#B1E5F2"}
          fontSize={10}
          width={"100%"}
          alignItems={"center"}
        >
          © 2025 Tidishop{" "}
        </Stack>
      </Container>
    </footer>
  );
}

export default Footer;
