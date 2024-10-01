import React from 'react'
import "./showMoreProducts.scss"
import Swal from 'sweetalert2'
import { callApiPageProducts } from '../../services/callApiProducts'


export const ShowMoreProducts = ({ setData, urlPage, setUrlPage }) => {

    const handleClick = () => {
        if (urlPage) {
            callApiPageProducts(urlPage)
                .then((newData) => {
                    if (newData.data && newData.data.length > 0) {
                        
                        setData((prevData) => [...prevData, ...newData.data]); 
                        setUrlPage(newData.urlPage); 
                    } else {
                        Swal.fire({
                            title: 'Aucun produits trouvés',
                            icon: 'error',
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    Swal.fire({
                        title: 'Erreur lors de la récupération des produits',
                        text: error.message,
                        icon: 'error',
                    });
                });
        } else {
            Swal.fire({
                title: 'Aucun produits trouvés',
                icon: 'error',
            });
        }
    }

    return (
        <>
            <button onClick={handleClick} className='buttonMoreProducts'>
                Voir plus...
            </button>
        </>
    );
};