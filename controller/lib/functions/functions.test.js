const pool = require('../../services/db');
const { verifyUniqKey } = require('./functions');

afterEach(async () => {
    // remove dummy test insertion from db
    await pool('DELETE FROM messages WHERE message_id = ?', ['dummy_key']);
});

describe('Functions.js testing suite', () => {
    describe('Function: verifyUniqKey: ', () => {
        it('Returns true if same key does not exist in database', async () => {
            const isKeyUniq = await verifyUniqKey('SOME_UNIQUE_KEY');
            expect(isKeyUniq).toBe(true);
        });

        it('Returns false if same key exists in database', async () => {
            // Insert a dummy record into the database
            await pool(
                'INSERT INTO messages (message_id, original_message, encrypted_message, private_key) VALUES (?, ?, ?, ?)',
                [
                    'dummy_key',
                    'Some message',
                    'asoıhdnoıahea',
                    'existing_privatekey',
                ]
            );

            // Test the function and expect the results to return false
            const check1 = await verifyUniqKey('dummy_key');
            expect(check1).toBe(false);
            const check2 = await verifyUniqKey('existing_privatekey');
            expect(check2).toBe(false);
        });
    });
});
