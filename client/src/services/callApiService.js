import axios from 'axios';
import { url } from './url';

/**
 * Sends a payment request to the API, specifying the buyer and multiple sellers.
 *
 * @param {string} buyerId - The ID of the buyer making the payment.
 * @param {Array<Object>} sellers - An array of seller payment details. Each object should contain information about the seller and the payment amount.
 * @returns {Promise<Object>} - The response data from the API if the call is successful
 * @throws {Error} - Throws an error if the sellers array is invalid or the API call fails.
 */
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