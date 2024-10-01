import axios from 'axios';
import { url } from './url';

export const apiCallUserProfil = async (pseudo)=>{
    try {   
        const response = await axios.get(`${url.userProfil}/${pseudo}`);
        if (response.data) {
            return response.data
        }
       
    } catch (error) {
        console.error('Error during API call:', error);
    }
}