import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

/**
 * @component DecryptMessageSection
 * @param {string} encryptedMessage the encrypted message to be decrypted
 * @param {function} setEncryptedMessage the setState hook that set's the encrypted message field
 * @param {string} privateKey the private key to decrypt the message with
 * @summary Decrypts an encrypted message using it's private key by sending a patch
 * request to the server with the key as its request's body.
 */
export default function DecryptMessageSection({
    encryptedMessage,
    setEncryptedMessage,
    privateKey,
}) {
    // Define the fetch callback function
    const callFetch = useFetch({ onEvent: true });
    // Define state for setting the response received from fetch callback function
    const [response, setResponse] = useState({});
    /**
     * @async
     * @summary Handles the message decryption after it get's called with onClick handler.
     * sends a request to the server to decrypt the message using it's private key in it's request
     * body. Set's the response state and response itself is used to render the decrypted message text
     * below.
     */
    const handleDecrypt = async () => {
        const response = await callFetch({
            callbackURL: '/api/messages/decrypt',
            fetchOptions: {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    privateKey,
                }),
            },
        });
        setResponse(response);
    };

    const encryptedMessageHandler = (e) => setEncryptedMessage(e.target.value);

    return (
        <>
            <div className='mb-4 row'>
                <label
                    htmlFor='inputEncryptedMessage'
                    className='col-sm-2 col-form-label'
                >
                    Encrypted Message
                </label>
                <div className='col-sm-10'>
                    <textarea
                        id='inputEncryptedMessage'
                        className='form-control'
                        rows='5'
                        onChange={encryptedMessageHandler}
                        value={encryptedMessage}
                        placeholder='Your encrypted message'
                    ></textarea>{' '}
                </div>
            </div>
            <div className='mb-4 row'>
                <div className='d-grid gap-2'>
                    <button
                        type='button'
                        className='btn btn-danger'
                        onClick={handleDecrypt}
                    >
                        Decrypt Message
                    </button>
                </div>
            </div>
            <div className='mb-4 row'>
                <label className='col-sm-2 col-form-label'>
                    Decrypted Message
                </label>
                <div className='col-sm-10'>
                    <textarea
                        className='form-control'
                        rows='5'
                        placeholder='Your decrypted message'
                        value={response.data && response.data.decryptedMessage}
                        readOnly
                    ></textarea>{' '}
                </div>
            </div>
        </>
    );
}
