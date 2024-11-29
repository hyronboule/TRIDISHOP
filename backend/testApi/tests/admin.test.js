const request = require('supertest');
const { url } = require('../config/configUrl');

require('dotenv').config();

let token;

describe('admin tests', ()=>{
    it ('test route: /admin/users, get users with autorization (role admin)', async ()=>{
        const responseLogin = await request(url.baseUrl).post(url.authUrlLogin).send({
            email: process.env.EMAIL_ADMIN,
            password: process.env.PASSWORD_TEST
        });
        token = responseLogin.body.token;

        const response = await request(url.baseUrl).get(url.adminUsers).set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200);
    })

    it ('test route: /admin/user, not valid user ', async () => {
        const response = await request(url.baseUrl).get(url.adminNotUserValid).set('Authorization', `Bearer ${token}`)

        expect ( response.statusCode ).toBe(404)
    })

    it ("test route: /admin/user with not autorization", async ()=>{

        const responseLogin = await request(url.baseUrl).post(url.authUrlLogin).send({
            email: process.env.EMAIL_TEST,
            password: process.env.PASSWORD_TEST
        });
        let tokenUser = responseLogin.body.token;

        const response = await request(url.baseUrl).get(url.adminUser).set('Authorization', `Bearer ${tokenUser}`)

        expect(response.status).toBe(403);
    })
})

