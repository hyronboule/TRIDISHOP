import axios from 'axios';
import { url } from './url';

export const callApiProductsUser = async (pseudo, urlPage) => {
    try {
        let response;

        if (!urlPage) {
             response = await axios.get(url.userProducts, {
                params: {
                    name: pseudo,
                },
            })
        }else{
             response = await axios.get(url);
        }
        if (response.data) {
            return response.data
        }

    } catch (error) {
        console.error('Error during API call:', error);
    }

}
export const callApiFileProducts = async (url) =>{
    try {
        const response = await axios.get(url);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
}
