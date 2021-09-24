const pool = require('./index.js');

describe('Pool high order function', () => {
    it('Performs a basic query', async () => {
        // Select 1 + 1
        const query = await pool('SELECT 1+1 AS test');
        // Expect returned data to be of type number
        expect(typeof query[0].test).toBe('number');
        // Expect result to be 2
        expect(query[0].test).toBe(2);
    });
    it('Performs a basic query with params', async () => {
        // Select 1 + 1
        const query = await pool('SELECT ? + ? AS test', [1, 1]);
        // Expect returned data to be of type number
        expect(typeof query[0].test).toBe('number');
        // Expect result to be 2
        expect(query[0].test).toBe(2);
    });
});
