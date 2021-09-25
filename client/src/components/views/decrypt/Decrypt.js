import React, { useState } from 'react';
import GetMessageSection from './GetMessageSection';
import DecryptMessageSection from './DecryptMessageSection';

/**
 * @component
 * @summary Decrypt section
 */
export default function Decrypt() {
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    return (
        <div>
            <h1 className="display-6 mb-5">Decrypt my message</h1>
            <GetMessageSection
                setEncryptedMessage={setEncryptedMessage}
                privateKey={privateKey}
                setPrivateKey={setPrivateKey}
            />
            <DecryptMessageSection
                encryptedMessage={encryptedMessage}
                setEncryptedMessage={setEncryptedMessage}
                privateKey={privateKey}
            />
        </div>
    );
}
