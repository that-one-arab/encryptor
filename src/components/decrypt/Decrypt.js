import React from "react";

export default function Decrypt() {
  return (
    <div>
      <h1 className="display-6 mb-5">Decrypt my message</h1>
      <div className="mb-4 row">
        <label htmlFor="inputMessageID" className="col-sm-2 col-form-label">
          Message ID
        </label>
        <div className="col-sm-10">
          <input className="form-control" id="inputMessageID" />
        </div>
      </div>
      <div className="mb-4 row">
        <label htmlFor="inputPrivateKey" className="col-sm-2 col-form-label">
          Private Key
        </label>
        <div className="col-sm-10">
          <input className="form-control" id="inputPrivateKey" />
        </div>
      </div>
      <div className="mb-4 row">
        <div className="d-grid gap-2">
          <button type="button" className="btn btn-info">
            Retrieve Message
          </button>
        </div>
      </div>
      <div className="mb-4 row">
        <label htmlFor="inputEncryptedMessage" className="col-sm-2 col-form-label">
          Encrypted Message
        </label>
        <div className="col-sm-10">
          <textarea
            id = "inputEncryptedMessage"
            className="form-control"
            rows="5"
            placeholder="Change me"
          ></textarea>{" "}
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
          ></textarea>{" "}
        </div>
      </div>
    </div>
  );
}
