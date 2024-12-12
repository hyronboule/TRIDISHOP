const request = require('supertest');
const { url } = require('../config/configUrl');

require('dotenv').config();

describe('test service', () => {
    it('test route /service/payments', async () => {
        const response = await request(url.baseUrl)
            .post(url.servicePayement)
            .send({
                buyerId: process.env.DATA_SERVICE_PAYEMENT_BUYER_ID,
                payments: [
                    {
                        sellerPayPalId: process.env.DATA_SERVICE_PAYEMENT_SELLER_ID,
                        amount: "40.00",
                    }
                ]
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('approvalUrl');
    });
});

describe('Test /transactions/transactions route', () => {
    it('should return 200 and a list of transactions with a valid admin token', async () => {
        const responseLogin = await request(url.baseUrl)
            .post(url.authUrlLogin)
            .send({
                email: process.env.EMAIL_ADMIN,
                password: process.env.PASSWORD_TEST
            });

        const adminToken = responseLogin.body.token;

        const response = await request(url.baseUrl)
            .get(url.findPayment)
            .set('Authorization', `Bearer ${adminToken}`);  

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); 
    });

    it('should return 401 when an invalid token is provided', async () => {
        const response = await request(url.baseUrl)
            .get(url.findPayment)

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('pas autorisé');
    });
});
