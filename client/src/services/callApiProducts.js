import axios from 'axios';
import { url } from './url';

/**
 * Fetches products for a specific user by their pseudo.
 *
 * @param {string} pseudo - The user's pseudo.
 * @returns {Promise<Object>} - The API response data. the returned object contains the products for the user.
 */
export const callApiProductsUser = async (pseudo) => {
    try {
        const response = await axios.get(url.userProducts, {
            params: {
                name: pseudo,
            },
        })

        if (response.data) {
            return response.data
        }

    } catch (error) {
        console.error('Error during API call:', error);
    }

}
/**
 * Fetches all products from the API.
 *
 * @returns {Promise<Object>} - the API returned all products.
 */
export const callApiAllProducts = async () => {
    try {

        const response = await axios.get(url.products)

        if (response.data) {
            return response.data
        }

    } catch (error) {
        console.error('Error during API call:', error);
    }

}
/**
 * Fetches paginated products from a specific URL.
 *
 * @param {string} url - The URL for the paginated products. For example: url + ?page=1
 * @returns {Promise<Object>} - The API response data. Products for the selected page
 */
export const callApiPageProducts = async (url) => {
    try {
        const response = await axios.get(url);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
}
/**
 * Fetches the details of a specific product by its ID.
 *
 * @param {string} id - The product ID.
 * @returns {Promise<Object>} - The API returned the details of the product 
 */
export const callApiDetailProduct = async (id) => {
    try {
        const response = await axios.get(`${url.product}/${id}`);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
}
/**
 * Sends a new product to the API with its data and files.
 *
 * @param {Object} addData - The product data, including tags (array) and files.
 * @returns {Promise<Object>} - The API returned a confirmation message
 */
export const addNewProductApi = async (addData) => {
    try {
        const formData = new FormData();

        formData.append("pseudo", addData.pseudo);
        formData.append("description", addData.description);
        addData.tags.forEach(tag => {
            formData.append('tags[]', tag);
        });
        formData.append("price", addData.price);

        if (addData.files) {
            addData.files.forEach(file => {
                formData.append("files", file);
            });
        }

        const response = await axios.post(url.upload, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        if (response.data) {
            return response;
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
}

/**
 * Updates a product's information by its file name.
 *
 * @param {string} nameFile - The product's file name.
 * @param {Object} data - The updated product data.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} - The API response returned the data and status 200
 */

export const callApiUpdatePoducts = async (nameFile, data,token) => {

    try {
        const formData = new FormData();
        if (data.description) {
            formData.append("description", data.description);
        } 
        if (data.tags) {
            data.tags.forEach(tag => {
                formData.append('tags[]', tag);
            });
        } 
        if (data.price) {
            formData.append("price", data.price);
        } 
        if (data.download) {
            formData.append("download", data.download);
        }

        const response = await axios.put(`${url.updateProduct}/${nameFile}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        });
        return response

    } catch (error) {
        console.error('Error during API call:', error);
    }
}
/**
 * Deletes a product by its file name.
 *
 * @param {string} nameFile - The product's file name.
 * @param {string} token - The authentication token.
 * @returns {Promise<number>} - The HTTP status code of the response ,200.
 */
export const deleteProduct = async (nameFile,token) => {
    try {
        const response = await axios.delete(`${url.deleteProduct}/${nameFile}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        return response.status
    } catch (error) {
        console.error('Error during API call:', error);
    }

}
/**
 * Searches for products by a search term.
 *
 * @param {string} search - The search query.
 * @returns {Promise<Object>} - The API returned the data for the search
 */
export const callApiSearchProduct = async (search) => {
    try {
        const response = await axios.get(`${url.products}`, {
            params: {
                search: search
            }
        });
        
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during API call:', error);
        return null;
    }
};
/**
 * Updates the user name for all products in the database.
 *
 * @param {string} name - The old user name.
 * @param {string} pseudo - The new user name.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} - The API returned the message and the status for the update
 */
export const updateNameUserAllProducts = async (name, pseudo,token) => {
    try {
        const response = await axios.put(
            url.updateNameUserAllProduct,
            null, 
            {
                params: {
                    name,
                    pseudo,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response?.status !== 404) {
            console.error('Error updating user name:', error.response?.data || error.message);
        }        
    }
};
