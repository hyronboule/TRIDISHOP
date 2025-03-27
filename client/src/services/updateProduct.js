import Swal from "sweetalert2";
import { callApiUpdatePoducts } from "./callApiProducts";

/**
 * Affiche un formulaire SweetAlert pour mettre à jour un produit et gère la mise à jour.
 *
 * @param {string} nameFile - L'identifiant du produit à mettre à jour.
 * @param {string} token - Le jeton d'authentification pour l'API.
 * @param {Array<string>} tags - Les tags actuels du produit.
 * @returns {Promise<boolean>} - Résout `true` si la mise à jour est réussie, sinon `false`.
 */
export const updateProductForm = (nameFile, token, tags) => {
  let updatedTags = [...tags];

  return Swal.fire({
    title: "Mise à jour du produit",
    html: `
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
      <p>Entrer les champs à modifier (laissez vide pour ne pas modifier) :</p>

      <input type="text" id="description" class="swal2-input" placeholder="Description" 
        style="width: 100%; max-width: 250px; text-align: center;">
      <input type="number" id="price" class="swal2-input" placeholder="Prix" min="0" 
        style="width: 100%; max-width: 250px; text-align: center;">

      <p style="padding-top: 10px; padding-bottom: 10px;">Modifier les tags :</p>

      <div id="tagContainer" style="
        display: flex; 
        flex-wrap: wrap; 
        gap: 5px; 
        padding: 10px; 
        max-width: 100%; 
        background: #f9f9f9;
        justify-content: center;
        text-align: center;
        overflow-x: hidden;">
        ${updatedTags
          .map(
            (tag) =>
              `<span class="tag-item" style="
                padding: 5px 10px; 
                background: #ddd; 
                border-radius: 5px; 
                cursor: pointer;
                font-size: 14px;
                white-space: nowrap;
                display: flex;
                align-items: center;
                gap: 5px;
              " data-tag="${tag}">
                ${tag} <span style="font-weight: bold;">✖</span>
              </span>`
          )
          .join("")}
      </div>

      <input type="text" id="tagsInput" class="swal2-input" placeholder="Ajouter des tags (séparés par une virgule)" 
        style="width: 100%; max-width: 250px; text-align: center;">

      <button id="addTagButton" class="swal2-confirm swal2-styled" style="
        margin-top: 10px; 
        width: 100%; 
        max-width: 250px;
        padding: 10px;
        font-size: 16px;
        text-align: center;
      ">
        Ajouter Tags
      </button>
    </div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Modifier",
    cancelButtonText: "Annuler",
    didOpen: () => {
      const tagContainer = Swal.getPopup().querySelector("#tagContainer");
      const tagsInput = Swal.getPopup().querySelector("#tagsInput");
      const addTagButton = Swal.getPopup().querySelector("#addTagButton");

      // Fonction pour supprimer un tag au clic
      const removeTag = (tagElement, tag) => {
        updatedTags = updatedTags.filter((t) => t !== tag);
        tagElement.remove();
      };

      // Mettre à jour l'affichage des tags
      const updateTagContainer = () => {
        tagContainer.innerHTML = updatedTags
          .map(
            (tag) =>
              `<span class="tag-item" style="padding: 5px 10px; background: #ddd; border-radius: 5px; cursor: pointer;" data-tag="${tag}">${tag} ✖</span>`
          )
          .join("");

        // Ajouter l'événement de suppression aux tags
        tagContainer.querySelectorAll(".tag-item").forEach((tagElement) => {
          const tag = tagElement.getAttribute("data-tag");
          tagElement.addEventListener("click", () => {
            removeTag(tagElement, tag);
          });
        });
      };

      // Ajout de nouveaux tags
      addTagButton.addEventListener("click", () => {
        let newTags = tagsInput.value
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);

        if (newTags.some((tag) => !/^[\p{L}]+$/u.test(tag))) {
          Swal.showValidationMessage(
            "Tags incorrects (seules les lettres sont autorisées)"
          );
          return;
        }

        if (updatedTags.length + newTags.length > 5) {
          Swal.showValidationMessage("Vous ne pouvez pas avoir plus de 5 tags");
          return;
        }

        newTags.forEach((tag) => {
          if (!updatedTags.includes(tag)) {
            updatedTags.push(tag);
            const span = document.createElement("span");
            span.textContent = tag + " ✖";
            span.classList.add("tag-item");
            span.style.padding = "5px 10px";
            span.style.background = "#ddd";
            span.style.borderRadius = "5px";
            span.style.cursor = "pointer";
            span.setAttribute("data-tag", tag);
            span.addEventListener("click", () => {
              removeTag(span, tag);
            });

            tagContainer.appendChild(span);
          }
        });

        tagsInput.value = "";
        updateTagContainer();
      });

      updateTagContainer();
    },
    preConfirm: () => {
      const description = Swal.getPopup().querySelector("#description").value;
      const price = Number(Swal.getPopup().querySelector("#price").value);

      if (!description &&(price === "" || isNaN(price)) && updatedTags.length === tags.length) {
        Swal.showValidationMessage(
          "Remplissez au moins un champ pour mettre à jour"
        );
        return null;
      }

      if (price === undefined && (isNaN(price) || price < 0)) {
        Swal.showValidationMessage("Entrez un prix valide");
        return null;
      }

      return {
        description: description || null,
        price: price >= 0 ? price : null,
        tags: updatedTags.length !== tags.length ? updatedTags : null,
      };
    },
  }).then((result) => {
    if (!result.isConfirmed || !result.value) {
      return false;
    }

    const { description, price, tags } = result.value;

    const data = {};
    if (description) data.description = description;
    if (price >= 0) data.price = price;
    if (tags) data.tags = tags;

    return callApiUpdatePoducts(nameFile, data, token)
      .then((data) => {
        if (data && data.status == "200") {
          Swal.fire("Produit mis à jour avec succès !");
          return true;
        } else {
          Swal.fire("Échec de la mise à jour du produit.");
          return false;
        }
      })
      .catch((err) => {
        console.error("Échec de la mise à jour du produit:", err);
        Swal.fire("Erreur lors de la mise à jour du produit.");
        return false;
      });
  });
};
