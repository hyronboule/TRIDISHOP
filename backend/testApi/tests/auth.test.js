const request = require('supertest');
const { url } = require('../config/configUrl');

require('dotenv').config();

let token;


// test route auuth/login
describe('Login Controller', () => {
    it('email or password invalid , return 400', async () => {
        const response = await request(url.baseUrl).post(url.authUrlLogin).send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email or password empty');
    });
    it('email and password is valid , return ', async () => {
        const response = await request(url.baseUrl).post(url.authUrlLogin).send({
            email: process.env.EMAIL_TEST,
            password: process.env.PASSWORD_TEST
        });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy();
        token = response.body.token;
    });
    it("password is invalid , return 400", async () => {
        const response = await request(url.baseUrl).post(url.authUrlLogin).send({
            email: process.env.EMAIL_TEST,
            password: "adjijfo"
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid password format. Must contain at least 8 characters, including uppercase, lowercase, number, and special characters');
    })
})

// test middleware and route auth/role
describe('get user role with the middleware of auth', () => {
    it('token valid, return 200', async () => {
        const response = await request(url.authUrlUserInfo)
        .get('').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        
    })
    it('token not valid, token modified', async () => {
        const response = await request(url.authUrlUserInfo)
        .get('').set('Authorization', `Bearer ${process.env.TOKEN_INVALID}`);
        expect(response.status).toBe(401);
    })
})

