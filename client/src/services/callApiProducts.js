import axios from 'axios';
import { url } from './url';

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