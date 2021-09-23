/**
 * @function getPKcharCodes
 * @param {string} privateKey the private key used for encrypting/decrypting the message
 * @returns an array of UTF 16 character-code units that belong to the private key string.
 */
const getPKcharCodes = (privateKey) => {
    // split each character.
    const splitString = privateKey.split('');

    // For each split character, map the character's UTF 16 code unit into the array
    const mapCharCode = splitString.map((c) => {
        return c.charCodeAt(0);
    });
    return mapCharCode;
};

/**
 * @callback scrambler This function is a callback function for array.map used in crypTOR's methods
 * @param {array element} msgCharCode the message's character code
 * @returns a scrambled or unscrambled character code, depending on which method called it.
 */
function scrambler(msgCharCode) {
    console.log('--* msgCharCode: ', msgCharCode);
    // For each character in the Private Key string, return it's UTF 16 code-unit in a new array.
    const PKcharCodes = getPKcharCodes(this.privateKey);
    console.log('--* PKcharCodes: ', PKcharCodes);
    // Fire a reducer function that reduces the values of Private Key's code-unit
    // array through a bitwise XOR operation with mgsCharCode being the initial value
    const switchedCharCode = PKcharCodes.reduce((a, b) => {
        return a ^ b;
    }, msgCharCode);
    console.log('--* switchedCharCode: ', switchedCharCode);
    // With the message character code scrambled/unscrambled with the private key's character
    // code, return that variable.
    return switchedCharCode;
}

/** @class */
function crypTOR() {
    /**
     * @constructs
     * @name encrypt
     * @param {string} privateKey Used to encrypt the string, the private key will be passed
     * to a function that scrambles the original message.
     * @param {string} message the original message to be encrypted.
     * @returns {string} returns the encrypted message.
     */
    this.encrypt = (privateKey, message) => {
        // Split all characters in the string into an array of characters
        const msgChars = message.split('');

        // For each character in the array, return it's UTF 16 code-unit in a new array.
        const msgCharCodes = msgChars.map((char) => {
            return char.charCodeAt();
        });

        // Scramble the original character codes with private key, and return new character
        // codes array.
        const scrambledChars = msgCharCodes.map(scrambler, { privateKey });

        // Further complicate matters by converting each scrambled character to a hexadecimal value
        const byteHexed = scrambledChars.map((n) => {
            // Get the base 16 (hexadecimal base) for that number
            const hexBasedNumber = Number(n).toString(16);
            // Add padding of zeros to the begining of the hex number. The amount of zeros that
            // will be added is equal to (4 MINUS hex number digits). The final result will always be
            // 4 digits. EG: 06 ==> 0006; 13d ==> 013d
            const hexValue =
                '0'.repeat(4 - hexBasedNumber.length) + hexBasedNumber;
            return hexValue;
        });
        // Join the array, and return the encrypted message.
        return byteHexed.join('');
    };

    /**
     * @constructs
     * @name decrypt
     * @param {string} privateKey Used to encrypt the string, the private key will be passed
     * to a function that unscrambles the original message.
     * @param {string} encryptedMsg the encrypted message to be decrypted.
     * @returns {string} returns the decrypted message.
     */
    this.decrypt = (privateKey, encryptedMsg) => {
        console.log('encryptedMsg: ', encryptedMsg);
        console.log('privateKey: ', privateKey);

        // Split every 4 characters in the encrypted message string through a regex
        // it returns every encrypted character's hexadecimal value
        const matchedMsg = encryptedMsg.match(/.{1,4}/g);
        console.log('matchedMsg: ', matchedMsg);

        // Convert every hexadecimal value to decimal
        const hexToDecimal = matchedMsg.map((hex) => parseInt(hex, 16));
        console.log('hexToDecimal: ', hexToDecimal);

        // Unscramble the decimal values with the private key
        const unscrambledChars = hexToDecimal.map(scrambler, {
            privateKey,
        });
        console.log('unscrambledChars: ', unscrambledChars);

        // Convert the character codes back to it's original form
        const convertToChars = unscrambledChars.map((charCode) =>
            String.fromCharCode(charCode)
        );
        console.log('convertToChars: ', convertToChars);

        // Join the decrypted characters into a string and return
        console.log('final: ', convertToChars.join(''));
        return convertToChars.join('');
    };
}

module.exports = crypTOR;
