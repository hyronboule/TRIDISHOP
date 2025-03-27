import { Container, Stack } from "@mui/material";
import { colorVar } from "../../style/colorVar";
import { useNavigate } from "react-router-dom";

function Vitrine() {
  const navigate = useNavigate();
  return (
    <Container
      className="page"
      maxWidth="100vw"
      sx={{
        paddingLeft: 0,
        paddingRight: 0,
        minHeight: "100%",
      }}
    >
      <Stack
        width={"80vw"}
        margin={"auto"}
        padding={{ xs: 2, sm: 5 }}
        gap={3}
        sx={{
          backgroundColor: colorVar.backgroundPaleGrey,
          borderRadius: "20px",
        }}
      >
        <h1
          className={"title titleSign"}
          style={{ height: "fit-content", paddingBottom: 10 }}
        >
          Bienvenue sur Tridishop
        </h1>
        <Stack>
          Tridishop est la plateforme idéale pour les passionnés et les
          professionnels du design 3D. Publiez, partagez ou achetez des modèles
          3D de qualité. Découvrez une communauté active de créateurs et
          d'acheteurs, et boostez vos projets avec des modèles 3D uniques.
          Rejoignez Tridishop dès maintenant pour explorer un univers créatif
          sans limites.
        </Stack>
        <Stack alignItems={"center"}>
          <ul style={{ width: "80%" }}>
            <li>Partager / Publier vos créations gratuitement</li>
            <li>Découvrir de nouveaux modèles 3D et les acheter</li>
            <li>Aperçu interactif du produit avant achat</li>
          </ul>
        </Stack>

        <h2>Qui sommes nous? </h2>
        <p>
          Des passionnés de modèles 3D voulant créer une application intuitive
          pour le partage et la mise en vente de modèles 3D.
        </p>

        <h2>Débutez votre expérience sur Tridishop :</h2>
        <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
          <button
            className={"buttonVitrine "}
            onClick={() => {
              navigate("/products");
            }}
          >
            Vers les produits
          </button>
          <button
            className={"buttonVitrine "}
            onClick={() => {
              navigate("/sign");
            }}
          >
            Créez un compte
          </button>
          <button
            className={"buttonVitrine "}
            onClick={() => {
              navigate("/login");
            }}
          >
            Connectez-vous
          </button>
        </Stack>
      </Stack>
    </Container>
  );
}
export default Vitrine;
