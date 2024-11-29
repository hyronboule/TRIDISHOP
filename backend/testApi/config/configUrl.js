const url = {
    baseUrl: "http://api-gateway:3000/api",
    authUrlLogin: "/auth/login",
    authUrlRegister: "/auth/register",
    authUrlUserInfo : 'http://auth:8081/getRole',
    adminUsers: '/admin/users?page=0',
    adminUser: '/admin/user/testUser',
    adminNotUserValid: '/admin/user/testPatate',
    allProducts : '/products/products',
    productsUser : '/products/productsUser?name=testUser',
    productsUserInvalid : '/products/productsUser?name=testPatate',
    displayProduct : '/products/displayFile/',
    detailProduct : '/products/detailProduct/',
    profilUser : '/profil/profilUser/testUser',
    servicePayement: '/service/payments'

}

module.exports = {url}