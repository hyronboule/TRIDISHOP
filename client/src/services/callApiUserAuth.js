import axios from 'axios';
import { url } from './url';
import Swal from 'sweetalert2';

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
