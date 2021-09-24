const app = require('../../../app');
const request = require('supertest');

describe('/api/generate-key testing suite', () => {
    describe('GET /api/generate-key', () => {
        it('returns a string with 16 character length', async () => {
            // Send a request to server
            const res = request(app).get('/api/generate-key').expect(200);
            // Await data
            const data = await res;
            // Expect data to be of type string
            expect(typeof data.body).toBe('string');
            // Expect length to be 16
            return expect(data.body.length).toBe(16);
        });
    });
});
