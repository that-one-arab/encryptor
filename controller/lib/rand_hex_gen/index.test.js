const generateKey = require('./index.js');

describe('rand_hex_gen testing', () => {
    it('returns a random string with 16 character length', async () => {
        // Await data
        const key = await generateKey(16);
        // Expect data to be of type string
        expect(typeof key).toBe('string');
        // Expect length to be 16
        expect(key.length).toBe(16);
    });
    it('returns a random string with 32 character length', async () => {
        // Await data
        const key = await generateKey(32);
        // Expect data to be of type string
        expect(typeof key).toBe('string');
        // Expect length to be 32
        expect(key.length).toBe(32);
    });
});
