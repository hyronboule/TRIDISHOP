const url = {
    baseUrl: "http://api-gateway:3000/api",
    authUrlLogin: "/auth/login",
    authUrlRegister: "/auth/register",
    authUrlUserInfo : 'http://auth:8081/role',
    adminUsers: '/admin/users?page=0',
    adminUser: '/admin/user/testUser',
    adminNotUserValid: '/admin/user/testPatate',
    allProducts : '/products/products',
    productsUser : '/products/products/user?name=testUser',
    productsUserInvalid : '/products/products/user?name=testPatate',
    displayProduct : '/products/file/',
    detailProduct : '/products/detail/',
    profilUser : '/profil/user/testUser',
    servicePayement: '/service/payments',
    findPayment : '/service/transactions'
}

module.exports = {url}