import axios from 'axios';
import { url } from './url';
import Swal from 'sweetalert2';

/**
 * Authenticates a user by their email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The authentication data from the API if successful (token)
 * @throws {Error} - Logs the error if the API call fails.
 */
export const callApiLogin = async (email, password) => {
    try {
        const result = await axios.post(url.auth, {
            email: email,
            password: password
        });
        if (result.data) {
            return result.data;
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
};
/**
 * Registers a new user with the given pseudo, email, and password.
 *
 * @param {string} pseudo - The user's pseudo.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The registration data from the API if successful. The api returned the data of the registration
 * @throws {Error} - Displays an error message using Swal if the user already exists or logs an error.
 */
export const callApiRegister = async (pseudo, email, password) => {

    try {
        const result = await axios.post(url.register, {
            pseudo: pseudo,
            email: email,
            password: password,
        });
        if (result.data) {
            return result.data;
        }
    } catch (error) {
        let errorMessage = error.response?.data?.message?.split(':')[2];

        if (errorMessage) {
            Swal.fire({
                icon: 'error',
                text: errorMessage || "L'utilisateur existe déjà"
            });
        } else {
            console.error('Error during API call:', error);
        }
    }
}
/**
 * Updates user authentication information such as email, pseudo, or password.
 *
 * @param {Object} data - The fields to update (e.g., pseudo, password).
 * @param {string} email - The current email of the user.
 * @param {string} token - The authentication token for the API call.
 * @returns {Promise<Object>} - The response data if the update is successful. The data is the user data
 * @throws {Error} - Returns a status and message if the email or pseudo is already used, or logs an error.
 */
export const callApiUpdateUserAuth = async (data, email,token) => {
    try {
        const requestBody = {
            email,
            ...data,
        };
        const response = await axios.put(
            url.updateUserAuth,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    
        return response.data;
    } catch (error) {
        if (error.response?.status === 400) {
            return { status: 400, message: "Email ou pseudo déjà utilisé" };
        } else {
            console.error('Error updating user info:', error.response?.data || error.message);
            throw new Error('Unexpected error'); 
        }
    }
};
