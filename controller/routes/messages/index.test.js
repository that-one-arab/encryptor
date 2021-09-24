const app = require('../../../app');
const request = require('supertest');

describe('/api/messages testing suite', () => {
    describe('GET /api/messages', () => {
        it('returns all the messages in the DB', async () => {
            const response = request(app).get('/api/messages').expect(200);
            const data = await response;
            return expect(data.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        message_id: expect.any(String),
                        original_message: expect.any(String),
                        encrypted_message: expect.any(String),
                        private_key: expect.any(String),
                        date: expect.any(String),
                        time: expect.any(String),
                    }),
                ])
            );
        });
        it("Encrypts a message and returns it's encrypted_message and id fields", async () => {
            
        });
    });
});
