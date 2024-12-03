import Swal from 'sweetalert2';
import { deleteProduct } from './callApiProducts';


export const deleteConfirmation = (nameFile) => {
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
            const response = await deleteProduct(nameFile);
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
