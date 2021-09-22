function encrypt(salt, text) {
    const getCharCode = (char) => {
        console.log('-- getCharCode functions...');
        console.log('-- ** original text char code:  ', char.charCodeAt());
        return char.charCodeAt();
    };
    const getStringCharCodes = (message) => {
        console.log('-- getStringCharCodes function...');
        // split each character.
        const splitMessage = message.split('');
        console.log('-- ** splitMessage: ', splitMessage);

        // For each split character, map the character's UTF 16 code unit into the array
        const mapCharCode = splitMessage.map((c) => {
            console.log('-- ** -- element charcode at: ', c.charCodeAt(0));
            return c.charCodeAt(0);
        });
        console.log(
            '-- ...getStringCharCodes function returnVal: ',
            mapCharCode
        );
        return mapCharCode;
    };

    const byteHex = (n) => {
        console.log('-- byteHex function... value of NUMBER: ', n);
        // Get the base 16 (hexadecimal base) for the number
        const hexBasedNumber = Number(n).toString(16);
        console.log('-- ** hexBasedNumber: ', hexBasedNumber);

        // Add a 0 to the begining of the number
        const val = '0' + hexBasedNumber;
        console.log('-- ** val: ', val);

        // For number larger than hexadecimal 10 (decimal 16) the string contains
        // a 0 at the begining, we substring it to guarantee that only the last two
        // characters are returned (without the 0 at the begining)
        const substringed = val.substr(-3);
        console.log('-- ** substringed: ', substringed);
        console.log('==================');
        return substringed;
    };

    const applySaltToChar = (code) => {
        console.log('-- applySaltToChar function... value of CODE: ', code);

        // Get the salt's UTF 16 code unit...
        const saltToChars = getStringCharCodes(salt);
        console.log('-- ** saltToChars: ', saltToChars);
        // Fire a reducer function on the array
        const returnVal = saltToChars.reduce((a, b) => {
            console.log(
                '-- ** -- reduce: value a: ',
                a,
                ' - value b: ',
                b,
                ' - total: ',
                a ^ b
            );
            return a ^ b;
        }, code);
        console.log('-- ** ...applySaltToChar function returnVal: ', returnVal);

        return returnVal;
    };

    const returned = text
        .split('')
        .map(getCharCode)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
    console.log('function END...');
    console.log('...function returnVal: ', returned);
    return returned;
}