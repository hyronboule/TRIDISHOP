const baseUrl = "http://localhost:3000/api"

export const url = {
    auth: `${baseUrl}/auth/login`,
    products : `${baseUrl}/products/products`,
    register : `${baseUrl}/auth/register`,
    userProducts : `${baseUrl}/products/productsUser`,
    userProfil : `${baseUrl}/profil/profilUser`,
    updateProfil : `${baseUrl}/profil/updateProfil`,
    createProfil : `${baseUrl}/profil/addProfil`,
    product : `${baseUrl}/products/detailProduct`,
    upload : `${baseUrl}/products/upload`,
    updateProduct: `${baseUrl}/products/updateProduct`,
    deleteProduct: `${baseUrl}/products/deleteProductUser`,
    servicePayment: `${baseUrl}/service/payments`,
}
