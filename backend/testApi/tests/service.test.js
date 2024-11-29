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
