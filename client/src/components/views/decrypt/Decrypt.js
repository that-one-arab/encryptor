import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';

function GetMessageSection({ updateUrl, message }) {
    console.log('in getMessageSection, message: ', message)
    const [messageID, setMessageID] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    // OnChange handlers
    const handleSetMessage = (e) => setMessageID(e.target.value);
    const handleSetPrivateKey = (e) => setPrivateKey(e.target.value);

    // OnClick handler
    const handleUpdateUrl = async () => {
      console.log('in handleUpdateUrl');
      console.log('going for messageID: ', `/api/messages/${messageID}`)
      updateUrl(`/api/messages/${messageID}`);
      if (message === 'try_pk') {
          console.log('failed for messageID, going for private key', `/api/messages/${privateKey}`);
          updateUrl(`/api/messages/${privateKey}`);
      }
      console.log('finished');
    };

    return (
        <>
            <div className="mb-4 row">
                <label
                    htmlFor="inputMessageID"
                    className="col-sm-2 col-form-label"
                >
                    Message ID
                </label>
                <div className="col-sm-10">
                    <input
                        value={messageID}
                        placeholder="Your message ID"
                        onChange={handleSetMessage}
                        className="form-control"
                        id="inputMessageID"
                    />
                </div>
            </div>
            <div className="mb-4 row">
                <label
                    htmlFor="inputPrivateKey"
                    className="col-sm-2 col-form-label"
                >
                    Private Key
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        id="inputPrivateKey"
                        value={privateKey}
                        placeholder="Your private key"
                        onChange={handleSetPrivateKey}
                    />
                </div>
            </div>
            <div className="mb-4 row">
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={handleUpdateUrl}
                    >
                        Retrieve Message
                    </button>
                </div>
            </div>
        </>
    );
}

function DecryptMessageSection({ message }) {
    return (
        <>
            <div className="mb-4 row">
                <label
                    htmlFor="inputEncryptedMessage"
                    className="col-sm-2 col-form-label"
                >
                    Encrypted Message
                </label>
                <div className="col-sm-10">
                    <textarea
                        id="inputEncryptedMessage"
                        className="form-control"
                        rows="5"
                        value={message && message.encryptedMessage}
                        placeholder="Your encrypted message"
                    ></textarea>{' '}
                </div>
            </div>
            <div className="mb-4 row">
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-danger">
                        Decrypt Message
                    </button>
                </div>
            </div>
            <div className="mb-4 row">
                <label className="col-sm-2 col-form-label">
                    Decrypted Message
                </label>
                <div className="col-sm-10">
                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Change me"
                        readOnly
                    ></textarea>{' '}
                </div>
            </div>
        </>
    );
}

export default function Decrypt() {
  console.log('decrypt component render')
  const { data: message, updateUrl } = useFetch('/api/messages/876918839e', {skipInitialFetch: true});
  const [encryptedMessage, setEncryptedMessage] = useState('');
  console.log('encrypted message: ', message);
  useEffect(() => {

      if (message.ok === false) setEncryptedMessage('try_pk');
      else setEncryptedMessage(message.encryptedMessage);
  }, [message]);
  return (
      <div>
          <h1 className="display-6 mb-5">Decrypt my message</h1>
          <GetMessageSection
              // updateUrl={updateUrl}
              // message={encryptedMessage}
          />
          <DecryptMessageSection />
      </div>
  );
}
