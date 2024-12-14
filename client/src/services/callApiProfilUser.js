import axios from 'axios';
import { url } from './url';

/**
 * Fetches a user's profile by their pseudo.
 *
 * @param {string} pseudo - The user's pseudo.
 * @returns {Promise<Object>} - The user's profile data.
 */
export const apiCallUserProfil = async (pseudo) => {
    try {
        const response = await axios.get(`${url.userProfil}/${pseudo}`);
        if (response.data) {
            return response.data
        }

    } catch (error) {
        console.error('Error during API call:', error);
    }
}
/**
 * Updates a user's profile with new data.
 *
 * @param {Object} data - The data to update in the profile.
 * @param {string} name - The current user's name.
 * @param {string} token - The authentication token.
 * @returns {Object} - The response indicating success or failure, along with a message.
 */
export const updatedUserProfil = async (data, name, token) => {
    try {

        const formData = new FormData();

        if (data.instagram) {
            formData.append('links[instagram]', data.instagram);
        }
        if (data.facebook) {
            formData.append('links[facebook]', data.facebook);
        }
        if (data.pseudo) {
            formData.append('newPseudo', data.pseudo);
        }
        if (data.image) {
            formData.append('image', data.image);
        }
        if (data.paypalEmail) {
            formData.append('paypalEmail', data.paypalEmail);
        }


        const response = await axios.put(`${url.updateProfil}/${name}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: response.data.message
        }

    } catch (error) {
        console.error('Error during API call:', error.response.data.message);
        return {
            sucess: false,
            message: error.response.data.message
        }
    }


}
/**
 * Creates a new user profile with a pseudo and PayPal email.
 *
 * @param {string} pseudo - The user's pseudo.
 * @param {string} email - The user's PayPal email.
 * @returns {Promise<Object>} - The Api return the data of the new profile
 */
export const callApiCreateProfilUser = async (pseudo, email) =>{
    try {
        const formData = new FormData()
        formData.append('pseudo', pseudo);
        formData.append('paypalEmail', email);

        const response = await axios.post(`${url.createProfil}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        if (response.data) {
            return response.data
        }
        
    }catch(err){
        console.error('Error during API call:', err);
    }
}