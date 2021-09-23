const dotenv = require('dotenv');
const path = require('path');
const pool = require('../../services/db');
const { verifyUniqKey } = require('./functions');

beforeEach(async () => {
    // initialize enviroment variables
    dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
    // remove test insertion from db
    await pool('DELETE FROM messages WHERE message_id = ?', ['existing_key'])
});

describe('Functions testing suite', () => {
    describe('Function: verifyUniqKey: ', () => {
        it('Returns true if same key does not exist in database', async () => {
            const isKeyUniq = await verifyUniqKey('id');
            expect(isKeyUniq).toBe(true);
        });
        it('Returns false if same key exists in database', async () => {
            await pool(
                'INSERT INTO messages (message_id, original_message, encrypted_message, private_key) VALUES (?, ?, ?, ?)',
                [
                    'existing_key',
                    'Some message',
                    'asoıhdnoıahea',
                    'existing_privatekey',
                ]
            );
            const check1 = await verifyUniqKey('existing_key');
            expect(check1).toBe(false);
            const check2 = await verifyUniqKey('existing_privatekey');
            expect(check2).toBe(false);
        });
    });
});
