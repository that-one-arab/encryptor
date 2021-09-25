import React, { useState } from 'react';
import useFetch from '../../../hooks/useFetch';

/**
 * @function copyToClipboard
 * @summary Copies data to the clipboard
 * @param {*} data data to be copied
 */
const copyToClipBoard = async (data) => {
    await navigator.clipboard.writeText(data);
};

/**
 * @component
 * @summary Private Key generator field
 * @param {string} privateKey the private key field
 * @param {function} fetchPrivateKey callback function to fetch a private key
 */
function PrivateKeyGen({ privateKey, fetchPrivateKey }) {
    return (
        <>
            <label className="col-sm-2 col-form-label">Private Key</label>
            <div className="col-sm-7">
                <input
                    className="form-control"
                    value={privateKey}
                    placeholder="Generate a private key for encryption"
                    readOnly
                />
            </div>
            <div className="col-sm-1">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => copyToClipBoard(privateKey)}
                >
                    <i className="far fa-clipboard"></i>
                </button>
            </div>
            <div className="col-sm-2">
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            fetchPrivateKey();
                        }}
                    >
                        Generate
                    </button>
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
    // Define return values for GET /api/generate-key route
    const { data: privateKey, refetch: fetchPrivateKey } = useFetch(
        '/api/generate-key',
        { skipInitialFetch: true }
    );

    // Message input field state
    const [originalMessage, setOriginalMessage] = useState('');

    // Define return values for POST /api/messages route
    const { data: message, refetch: submitMessage } = useFetch(
        '/api/messages',
        { skipInitialFetch: true, callbackFunc: refetchMessages },
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                originalMessage: originalMessage,
                privateKey: privateKey,
            }),
        }
    );

    return (
        <div>
            <h1 className="display-6 mb-5">Encrypt my message</h1>
            <div className="mb-4 row">
                <PrivateKeyGen
                    privateKey={privateKey}
                    fetchPrivateKey={fetchPrivateKey}
                />
            </div>
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
                        onChange={(e) => setOriginalMessage(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-4 row">
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={submitMessage}
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
                        value={message && message.encryptedMessage}
                    ></textarea>{' '}
                </div>
            </div>
        </div>
    );
}
