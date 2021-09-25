import React, { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import PrivateKeyGen from './PrivateKeyGen';

export function EncryptMessageSection({ privateKey, refetchMessages }) {
    const [originalMessage, setOriginalMessage] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const callFetch = useFetch({ onEvent: true });

    const originalMessageHandler = (e) => setOriginalMessage(e.target.value);
    const encryptMessageHandler = async () => {
        const response = await callFetch({
            callbackURL: '/api/messages',
            fetchOptions: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${document.cookie.slice(11)} `,
                },
                body: JSON.stringify({
                    originalMessage,
                    privateKey,
                }),
            },
        });
        setEncryptedMessage(response.data.encryptedMessage)
        refetchMessages()
    };

    return (
        <>
            <div className="mb-4 row">
                <label
                    htmlFor="inputMessage"
                    className="col-sm-2 col-form-label"
                    value={originalMessage}
                >
                    Your message
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        id="inputMessage"
                        onChange={originalMessageHandler}
                    />
                </div>
            </div>
            <div className="mb-4 row">
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={encryptMessageHandler}
                    >
                        Submit / Encrypt
                    </button>
                </div>
            </div>
            <div className="mb-4 row">
                <label className="col-sm-2 col-form-label">
                    Encrypted Message
                </label>
                <div className="col-sm-10">
                    <textarea
                        className="form-control"
                        rows="5"
                        readOnly
                        placeholder="Your message after submitting the encryption request..."
                        value={encryptedMessage}
                    ></textarea>{' '}
                </div>
            </div>
        </>
    );
}

/**
 * @component
 * @summary Encryption section
 */
export default function Encrypt({ refetchMessages }) {
    const [privateKey, setPrivateKey] = useState('');

    return (
        <div>
            <h1 className="display-6 mb-5">Encrypt my message</h1>
            <PrivateKeyGen
                privateKey={privateKey}
                setPrivateKey={setPrivateKey}
            />
            <EncryptMessageSection privateKey={privateKey} refetchMessages={refetchMessages} />
        </div>
    );
}
