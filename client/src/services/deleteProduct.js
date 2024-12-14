import Swal from 'sweetalert2';
import { deleteProduct } from './callApiProducts';

/**
 * Displays a confirmation dialog to delete a product and handles the deletion logic.
 *
 * @param {string} nameFile - The identifier of the product to be deleted.
 * @param {string} token - The authentication token for the API call.
 * @returns {Promise<boolean>} - Resolves to `true` if the product is successfully deleted, otherwise `false`.
 */
export const deleteConfirmation = (nameFile,token) => {
    return Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez vous supprimer le produit ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
    }).then(async (result) => {
        if (result.isConfirmed) {
            // Code for confirm the deletion
            const response = await deleteProduct(nameFile,token);
            if (response) {
                if (response == "200") {
                    return true;
                }
            }
        }
        // Code for cancel the deletion
        return false;
    });
};
