import Swal from "sweetalert2";
import { updatedUserProfil } from "./callApiProfilUser";

export const updateProfil = async (token, name) => {
  let image = null;

  await Swal.fire({
    title: "Modifier votre profil",
    html: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div id="imagePreview" style="width: 200px; height: 200px; background: grey; border-radius: 10px; overflow: hidden;"></div>
            <label for="image" style="cursor: pointer; background: #B1E5F2; color: black; padding:10px; border-radius: 5px; border : none; height : fit-content">
                Importer une image (jpeg ou png)
            </label>
            <input type="file" id="image" style="display: none;" />
            <p style="text-align: start; text-decoration: underline; margin: 0;">Liens de profil :</p>
            <input id="instagram" type="text" placeholder="Rentrez un lien Instagram..." class="swal2-input" />
            <input id="facebook" type="text" placeholder="Rentrez un lien Facebook..." class="swal2-input" />
        </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Enregistrer",
    didOpen: () => {
      const fileInput = document.getElementById("image");
      const previewContainer = document.getElementById("imagePreview");

      fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          const type = file.name.split(".").pop().toLowerCase();
          const ko = 100;
          const maxSize = ko * 1024 ; // 100 Ko

          if (type !== "jpeg" && type !== "png") {
            Swal.showValidationMessage(
              "Veuillez choisir une image au format jpeg ou png."
            );
            fileInput.value = "";
            return;
          }
          if (file.size > maxSize) {
            Swal.showValidationMessage(
              `La taille du fichier ne doit pas dépasser ${ko} Ko.`
            );
            fileInput.value = "";
            return;
          }

          image = file;
          previewContainer.innerHTML = `<img src="${URL.createObjectURL(
            file
          )}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" />`;
        }
      });
    },
    preConfirm: () => {
      const instagram = document.getElementById("instagram").value.trim();
      const facebook = document.getElementById("facebook").value.trim();

      if (instagram && !validateUrl(instagram)) {
        Swal.showValidationMessage(
          "Veuillez renseigner un lien Instagram valide."
        );
        return false;
      }
      if (facebook && !validateUrl(facebook)) {
        Swal.showValidationMessage(
          "Veuillez renseigner un lien Facebook valide."
        );
        return false;
      }

      if (!image && !instagram && !facebook) {
        Swal.showValidationMessage(
          "Veuillez ajouter au moins une information (image, Instagram ou Facebook)."
        );
        return false;
      }

      return { image, instagram, facebook };
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { image, instagram, facebook } = result.value;

      let data = {
        instagram: instagram,
        facebook: facebook,
        image: image,
        paypalEmail: "",
      };

      try {
        updatedUserProfil(data, name, token).then((data) => {
          Swal.fire({
            title: data.message,
            icon: data.success ? "success" : "error",
          });
          return response.success;
        });
      } catch (error) {
        Swal.fire({
          text: "Une erreur est survenue lors de la mise à jour du profil.",
          icon: "error",
        });
        return false;
      }
    }
    return false;
  });
};

// Fonction de validation des URLs
const validateUrl = (url) => /^https?:\/\//.test(url);
