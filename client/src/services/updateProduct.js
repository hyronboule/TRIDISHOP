import Swal from 'sweetalert2';
import { callApiUpdatePoducts } from './callApiProducts';

/**
 * Displays a form using Swal (SweetAlert) to update a product and handles the update process.
 *
 * @param {string} nameFile - The identifier of the product to be updated.
 * @param {string} token - The authentication token for the API call.
 * @returns {Promise<boolean>} - Resolves to `true` if the product is successfully updated, otherwise `false`.
 */
export const updateProductForm = (nameFile,token) => {
    return Swal.fire({
        title: 'Mise à jour du produit',
        html: `
        <p>Entrer les champs qui doivent être modifiés (laissez vide pour ne pas modifier) :</p>
        <input type="text" id="description" class="swal2-input" placeholder="Description">
        <input type="number" id="price" class="swal2-input" placeholder="Prix" min="0">
        <input type="text" id="tags" class="swal2-input" placeholder="Tags">
      `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Modifier',
        cancelButtonText: 'Annuler',
        preConfirm: () => {
            // Get the values from the inputs
            const description = Swal.getPopup().querySelector('#description').value;
            const price = Swal.getPopup().querySelector('#price').value;
            let tags = Swal.getPopup().querySelector('#tags').value;

            if (!description && !price && !tags) {
                Swal.showValidationMessage('Remplissez au moins un champ pour mettre à jour');
                return null;
            }

            // Ensure the price is a valid number if it is provided
            if (price && (isNaN(price) || price < 0)) {
                Swal.showValidationMessage('Entrez un prix valide');
                return null;
            }

            //  valide tags 
            if (tags.trim() !== '') {
                if (/^(?:[\p{L}]+(?:,[\p{L}]+)*)?$/u
                    .test(tags)) {
                    let tagArray = tags.split(',').map(tag => tag.trim());
                    tags = tagArray;
                } else {
                    Swal.showValidationMessage('Tags incorrect (ex : tag1, tag2)');
                    return null;
                }
            }

            // return data (description or price or description and price)
            return { description: description || null, price: price || null, tags: tags || null };
        }
    }).then((result) => {
        if (!result.isConfirmed || !result.value) {
            return false;
        }

        const { description, price, tags } = result.value;

        const data = {};
        if (description) data.description = description;
        if (price) data.price = price;
        if (tags) data.tags = tags;

        return callApiUpdatePoducts(nameFile, data,token).then((data) => {
            if (data && data.status == '200') {
                //reload page
                return true;
            } else {
                // don't reload
                return false;
            }
        }).catch((err) => {
            console.error('Updated product failed:', err);
            return false;
        });
    });
};
