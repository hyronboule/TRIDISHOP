// const { connectDBAuth, disconnectDBAuth, clearDatabase } = require('../config/configMongoServerTest');
// const request = require('supertest');
// const { url } = require('../config/configUrl');

// require('dotenv').config();

// // temporary base mongodb for testing
// beforeAll(async () => {

//     await connectDBAuth(true); // `true` for MongoDB Memory Server
// });

// afterEach(async () => {
//     await clearDatabase();
// });

// afterAll(async () => {
//     await disconnectDBAuth();
// });

// // test route auth/register
// describe('test controller register', () => {

//     it(' user valide is registered', async () => {
//         console.log('ok');

//         const response = await request(url.baseUrl).post(url.authUrlRegister).send({
//             pseudo: 'testApi',
//             email: 'testApi@test.com',
//             password: 'Tshfoa08zdd!',
//             date: new Date()
//         })
//         console.log('response: ', response.body);

//         expect(response.status).toBe(201);
//         expect(response.body.email).toBe('testapi@test.com');
//         expect(response.body.password).toBeUndefined();
//     })
// })