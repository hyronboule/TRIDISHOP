import axios from "axios";
import { url } from "./url";

export const getUsers = async (token) => {
    try {
        const response = await axios.get(url.adminUsers, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        throw error; 
    }
};
