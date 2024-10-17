import axios from 'axios';
import { url } from './url';

export const callApiProductsUser = async (pseudo) => {
    try {
        const response = await axios.get(url.userProducts, {
            params: {
                name: pseudo,
            },
        })

        if (response.data) {
            return response.data
        }

    } catch (error) {
        console.error('Error during API call:', error);
    }

}
export const callApiAllProducts = async () => {
    try {

        const response = await axios.get(url.products)

        if (response.data) {
            return response.data
        }

    } catch (error) {
        console.error('Error during API call:', error);
    }

}
export const callApiPageProducts = async (url) => {
    try {
        const response = await axios.get(url);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
}

export const callApiDetailProduct = async (id) => {
    try {
        const response = await axios.get(`${url.product}/${id}`);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
}

export const addNewProductApi = async (addData) => {
    try {
        console.log(addData.files);

        const formData = new FormData();

        formData.append("pseudo", addData.pseudo);
        formData.append("description", addData.description);
        addData.tags.forEach(tag => {
            formData.append('tags[]', tag);
        });
        formData.append("price", addData.price);

        if (addData.files) {
            addData.files.forEach(file => {
                formData.append("files", file);
            });
        }

        const response = await axios.post(url.upload, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        if (response.data) {
            return response;
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
}


export const callApiUpdatePoducts = async (nameFile, data) => {
    try {
        const formData = new FormData();
        if (data.description) {
            formData.append("description", data.description);
        } else if (data.tags) {
            data.tags.forEach(tag => {
                formData.append('tags[]', tag);
            });
        } else if (data.price) { 
            formData.append("price", data.price);
        }

        const response = await axios.put(`${url.updateProduct}/${nameFile}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
       
        return response

    } catch (error) {
        console.error('Error during API call:', error);
    }
}

export const deleteProduct = async (nameFile) =>{
    try {
        const response = await axios.delete(`${url.deleteProduct}/${nameFile}`)
        return response.status
    } catch (error) {
        console.error('Error during API call:', error);
    }
    
}

export const callApiSearchProduct = async (search) => {
    try {
        const response = await axios.get(`${url.products}`, {
            params: {
                search: search 
            }
        });
        console.log(response);
        
        if (response.status === 200) {
            return response.data; 
        }
    } catch (error) { 
        console.error('Error during API call:', error);
        return null;
    }
};