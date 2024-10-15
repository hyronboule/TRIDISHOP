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

export const callApiRegister = async (pseudo, email, password,date) => {

    try {
        const result = await axios.post(url.register, {
            pseudo: pseudo,
            email: email,
            password: password,
            date: date
        });
        if (result.data) {
            return result.data;
        }
    } catch (error) {
        console.error('Error during API call:', error);
        Swal.fire({
            icon: 'error',
            text: "L'utilisateur existe déjà"
          })
    }
}