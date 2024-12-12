const request = require('supertest');
const { url } = require('../config/configUrl');

require('dotenv').config();

describe('test profil routes', ()=>{
    it('test route /profil/user with the pseudo', async ()=>{
        const response = await request(url.baseUrl).get(url.profilUser)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('pseudo')
        expect(response.body.pseudo).toBe('testUser')
    })
})