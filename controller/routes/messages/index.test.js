const app = require('../../../app');
const request = require('supertest');
const pool = require('../../services/db');

// Define message fields that already exist in the database
const preExistingMessageFields = {
    messageID: '3b5101fa33',
    originalMessage: 'This app is done!',
    encryptedMessage:
        '005f006300620078002b006a007b007b002b00620078002b006f00640065006e002a',
    privateKey: 'approved',
};

// Define message fields to be inserted in the database (To test the POST route)
const testInsertion = {
    messageID: 'd405931d87',
    privateKey: '9ffe7088ff1ca90d',
    originalMessage: 'Hello there my dear fello',
    encryptedMessage:
        '004d006000690069006a00250071006d00600077006000250068007c0025006100600064007700250063006000690069006a',
};

// Define the message fields that DO NOT EXIST in the database (Any random value that doesnt exist in DB)
const nonExistingMessageFields = {
    testMessageID: 'MessageIDThatDoesNotExist',
    testPrivateKey: 'privateKeyThatDoesntExist',
    testOriginalMessage: 'Im a dummy value that doesnt exist in the database',
    testEncryptedMessage: 'encrpytedMessateThatDoesntExist',
};

beforeAll(async () => {
    // Delete the test message insertion before running the tests.
    const { privateKey, messageID } = testInsertion;
    await pool('DELETE FROM messages WHERE private_key = ? OR message_id = ?', [
        privateKey,
        messageID,
    ]);
});

describe('/api/messages testing suite', () => {
    describe('GET /api/messages', () => {
        it('returns all the messages in the DB', async () => {
            const response = request(app).get('/api/messages').expect(200);
            const data = await response;
            return expect(data.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        messageID: expect.any(String),
                        originalMessage: expect.any(String),
                        encryptedMessage: expect.any(String),
                        privateKey: expect.any(String),
                        date: expect.any(String),
                        time: expect.any(String),
                    }),
                ])
            );
        });
    });

    describe('POST /api/messages', () => {
        it("Returns 406 if required object properties don't exist on req body", async () => {
            const { testOriginalMessage, testPrivateKey } =
                nonExistingMessageFields;

            // Testing with { correctProperty, falseProperty }
            const response1 = request(app)
                .post('/api/messages')
                .send({
                    originalMessage: testOriginalMessage,
                    randomProperty: 'Some random property',
                })
                .expect(406);
            const data1 = await response1;
            expect(data1.body).toBe('Unexpected input');

            // Testing with { falseProperty, correctProperty }
            const response2 = request(app)
                .post('/api/messages')
                .send({
                    randomProperty: 'Some random property',
                    privateKey: testPrivateKey,
                })
                .expect(406);
            const data2 = await response2;
            expect(data2.body).toBe('Unexpected input');

            // Testing with { falseProperty, falseProperty }
            const response3 = request(app)
                .post('/api/messages')
                .send({
                    randomProperty: 'Some random property',
                    anotherRandomProperty: testPrivateKey,
                })
                .expect(406);
            const data3 = await response3;
            return expect(data3.body).toBe('Unexpected input');
        });

        it("Encrypts a message and returns it's encrypted_message and id fields", async () => {
            const { privateKey, originalMessage, encryptedMessage } =
                testInsertion;
            const response = request(app)
                .post('/api/messages')
                .send({
                    originalMessage,
                    privateKey,
                })
                .expect(201);
            const data = await response;
            return expect(data.body).toMatchObject({
                messageID: expect.any(String),
                encryptedMessage,
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
    });

    describe('GET /api/messages/:identifier', () => {
        const { messageID, privateKey } = preExistingMessageFields;
        it("Returns the encrypted message and it's message ID when the user requests it through MESSAGE ID", async () => {
            const response = request(app)
                .get(`/api/messages/${messageID}`)
                .expect(200);
            const data = await response;
            return expect(data.body).toMatchObject({
                messageID: expect.any(String),
                encryptedMessage: expect.any(String),
            });
        });

        it("Returns the encrypted message and it's message ID when the user requests it through PRIVATE KEY", async () => {
            const response = request(app)
                .get(`/api/messages/${privateKey}`)
                .expect(200);
            const data = await response;
            return expect(data.body).toMatchObject({
                messageID: expect.any(String),
                encryptedMessage: expect.any(String),
            });
        });
    });

    describe('PATCH /api/messages/decrypt/:identifier', () => {
        it("Finds a message through it's ID, decrypts and returns it's original form", async () => {
            const { privateKey, originalMessage } = preExistingMessageFields;
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
});
