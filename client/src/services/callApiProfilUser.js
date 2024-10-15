import axios from 'axios';
import { url } from './url';

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

export const updatedUserProfil = async (data, name) => {
    try {

        const formData = new FormData();

        if (data.instagram) {
            formData.append('links[instagram]', data.instagram);
        }
        if (data.facebook) {
            formData.append('links[facebook]', data.facebook);
        }

        if (data.image) {
            formData.append('image', data.image);
        }


        const response = await axios.put(`${url.updateProfil}/${name}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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