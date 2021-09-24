const app = require('./app');
const request = require('supertest');
const pool = require('./controller/services/db');

// Define message fields that already exist in the database
const testInsertion = {
    messageID: '',
    originalMessage: 'This is a full integration test!',
    encryptedMessage: '',
    privateKey: '',
};

afterAll(async () => {
    // Delete the test message insertion before running the tests.
    const { privateKey, messageID } = testInsertion;
    await pool('DELETE FROM messages WHERE private_key = ? OR message_id = ?', [
        privateKey,
        messageID,
    ]);
});

describe('Integration test', () => {
    it('Returns a private key', async () => {
        const res = request(app).get('/api/generate-key').expect(200);
        const data = await res;
        expect(typeof data.body).toBe('string');

        console.log(data.body);
        testInsertion.privateKey = data.body;
        console.log(testInsertion);

        return expect(data.body.length).toBe(16);
    });
    it('Encrypts and saves the message to the database, and returns encryptedMessage and messageID fields', async () => {
        const { privateKey, originalMessage } = testInsertion;
        const res = request(app)
            .post('/api/messages')
            .send({
                originalMessage,
                privateKey,
            })
            .expect(201);
        const data = await res;

        console.log(data.body);
        testInsertion.encryptedMessage = data.body.encryptedMessage;
        testInsertion.messageID = data.body.messageID;
        console.log(testInsertion);

        return expect(data.body).toMatchObject({
            messageID: expect.any(String),
            encryptedMessage: expect.any(String),
        });
    });
    it('Returns 409 on attempted encryption of a message with the same private key', async () => {
        const { privateKey, originalMessage } = testInsertion;
        const response = request(app)
            .post('/api/messages')
            .send({
                originalMessage,
                privateKey,
            })
            .expect(409);
        const data = await response;
        return expect(data.body).toBe(
            'This key already exists in the database'
        );
    });
    it("Returns the encrypted message and it's message ID when the user requests it through MESSAGE ID", async () => {
        const { messageID, encryptedMessage } = testInsertion;
        const response = request(app)
            .get(`/api/messages/${messageID}`)
            .expect(200);
        const data = await response;
        return expect(data.body).toMatchObject({
            messageID,
            encryptedMessage,
        });
    });
    it("Returns the encrypted message and it's message ID when the user requests it through PRIVATE KEY", async () => {
        const { privateKey, encryptedMessage, messageID } = testInsertion;
        const response = request(app)
            .get(`/api/messages/${privateKey}`)
            .expect(200);
        const data = await response;
        return expect(data.body).toMatchObject({
            messageID,
            encryptedMessage,
        });
    });
    it("Finds a message through it's private key, decrypts and returns it's original form", async () => {
        const { privateKey, originalMessage } = testInsertion;
        const response = request(app)
            .patch(`/api/messages/decrypt`)
            .send({ privateKey })
            .expect(200);
        const data = await response;
        return expect(data.body).toMatchObject({
            decryptedMessage: originalMessage,
        });
    });
});
