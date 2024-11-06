import axios from 'axios';
import { url } from './url';

export const callApiServicePayment = async (buyerId, sellers) => {
    
    try {
      
        if (!Array.isArray(sellers) || sellers.length === 0) {
            throw new Error("Sellers must be a non-empty array");
        }

        const response = await axios.post(url.servicePayment, {
            buyerId: buyerId, 
            payments: sellers
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during API call:', error);
        throw error; 
    }
}