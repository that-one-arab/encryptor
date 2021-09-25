import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

/**
 * @component
 * @param {string} privateKey the private key used to fetch the encrypted message
 * @param {function} setPrivateKey react useState hook that set's the private key
 * @param {function} setEncryptedMessage react useState hook that set's the encrypted message
 * @summary This component fetches the encrypted message using either the message ID or the
 * private key. The private key and encrypted message are neccessary in it's parent component
 * since it will be passed as a prop to it's sibling 'DecryptMessageSection' component, that is
 * why they are passed as a prop here.
 */
export default function GetMessageSection({
    privateKey,
    setPrivateKey,
    setEncryptedMessage,
}) {
    const callFetch = useFetch({ onEvent: true });
    const [messageID, setMessageID] = useState('');

    const handleMessageID = (e) => setMessageID(e.target.value);
    const handlePrivateKey = (e) => setPrivateKey(e.target.value);

    /**
     * @async @param {string} identifier either the messageID or the private key.
     * @summary helper function for fetching the encrypted message using the messageID or the private key
     * @returns {void} set's state for encryptedMessage on success, returns a status regarding
     * it's error on failure.
     */
    const fetchWith = async (identifier) => {
        // If field is empty, return empty_field status
        if (identifier.trim() === '') {
            setEncryptedMessage('');
            return { status: 'empty_field' };
        }
        const response = await callFetch({
            callbackURL: `/api/messages/${identifier}`,
        });
        // If JSON string does not match the below string, setState the encrypted
        // message and return.
        if (response.data !== 'Requested message does not exist in database') {
            setEncryptedMessage(response.data.encryptedMessage);
            return { status: 'found' };
        } else {
            setEncryptedMessage('');
            return { status: 'not_found' };
        }
    };

    /**
     * @async
     * @summary handles fetching encrypted message once called through the onClick handler.
     * @returns {void} set's state for encryptedMessage with an error string on failure.
     */
    const handleFetch = async () => {
        // Attempt to fetch with message ID
        const msgIdResponse = await fetchWith(messageID);
        // If fetch is a success, return out of this function
        if (msgIdResponse.status.match(/^(empty_field|not_found)$/) === null)
            return;
        // Else attempt to fetch with private key
        const pkResponse = await fetchWith(privateKey);
        // If fetch is a failure, return message not found field
        if (pkResponse.status.match(/^(empty_field|not_found)$/) !== null)
            return setEncryptedMessage(
                'MESSAGE NOT FOUND please check your message ID or private key'
            );
    };

    return (
        <>
            <div className='mb-4 row'>
                <label
                    htmlFor='inputMessageID'
                    className='col-sm-2 col-form-label'
                >
                    Message ID
                </label>
                <div className='col-sm-10'>
                    <input
                        value={messageID}
                        placeholder='Your message ID'
                        onChange={handleMessageID}
                        className='form-control'
                        id='inputMessageID'
                    />
                </div>
            </div>
            <div className='mb-4 row'>
                <label
                    htmlFor='inputPrivateKey'
                    className='col-sm-2 col-form-label'
                >
                    Private Key
                </label>
                <div className='col-sm-10'>
                    <input
                        className='form-control'
                        id='inputPrivateKey'
                        value={privateKey}
                        placeholder='Your private key'
                        onChange={handlePrivateKey}
                    />
                </div>
            </div>
            <div className='mb-4 row'>
                <div className='d-grid gap-2'>
                    <button
                        type='button'
                        className='btn btn-info'
                        onClick={handleFetch}
                    >
                        Retrieve Message
                    </button>
                </div>
            </div>
        </>
    );
}
