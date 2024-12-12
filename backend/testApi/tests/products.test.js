const request = require('supertest');
const { url } = require('../config/configUrl');

require('dotenv').config();

let file;

describe('test products', ()=>{
    it ("test route /products/products, get products", async () => {
        const response = await request(url.baseUrl).get(url.allProducts)

        file = response.body.data[0].nameFile
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
    })
    it ("test route /products/products/user, get products for one user", async () => {
        const response = await request(url.baseUrl).get(url.productsUser)
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
    })
    it ("test route /products/products/user, get products for one user, the user not exist", async () => {
        const response = await request(url.baseUrl).get(url.productsUserInvalid)
        
        expect(response.statusCode).toBe(404)
    })
    it ("test route /products/file, get file with the nameFile", async () => {
        const response = await request(url.baseUrl).get(url.displayProduct + file)
        
        expect(response.statusCode).toBe(200)
    })
    it ("test route /products/file, not get file with a false nameFile", async () => {
        const response = await request(url.baseUrl).get(url.displayProduct + '00000000JZKA')
        
        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("File not found");
    })

    it ("test route /products/detail, get the detail of product with the nameFile ", async () => {
        const response = await request(url.baseUrl).get(url.detailProduct + file)
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data');
        expect(typeof response.body.data).toBe('object');
    })
    it ("test route /products/detail, not get the detail of product with a invalid nameFile ", async () => {
        const response = await request(url.baseUrl).get(url.detailProduct + "nfafj9720")
        
        expect(response.statusCode).toBe(404)
    })
})