const baseUrl = import.meta.env.VITE_URL_BASE

export const url = {
    auth: `${baseUrl}/auth/login`,
    updateUserAuth : `${baseUrl}/auth/user`,
    urlDeleteUserAccount : `${baseUrl}/auth/user`,
    products : `${baseUrl}/products/products`,
    register : `${baseUrl}/auth/register`,
    userProducts : `${baseUrl}/products/products/user`,
    updateNameUserAllProduct : `${baseUrl}/products/products/user`,
    userProfil : `${baseUrl}/profil/user`,
    updateProfil : `${baseUrl}/profil/user`,
    createProfil : `${baseUrl}/profil/add`,
    product : `${baseUrl}/products/detail`,
    upload : `${baseUrl}/products/upload`,
    updateProduct: `${baseUrl}/products/product`,
    deleteProduct: `${baseUrl}/products/product`,
    servicePayment: `${baseUrl}/service/payments`,
}
