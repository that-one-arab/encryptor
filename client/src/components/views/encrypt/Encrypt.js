import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';

export default function Encrypt() {
    // Skips the initial fetch, allows fetches after button onclick event
    const [skip, setSkip] = useState(true);
    const { data, refetch } = useFetch('/api/generate-key', skip);
    const primaryKey = data;
    const [message, setMessage] = useState('');

    const copyToClipBoard = async () => {
        await navigator.clipboard.writeText(data);
    };

    return (
        <div>
            <h1 className="display-6 mb-5">Encrypt my message</h1>
            <div className="mb-4 row">
                <label className="col-sm-2 col-form-label">Private Key</label>
                <div className="col-sm-7">
                    <input className="form-control" value={primaryKey} readOnly />
                </div>
                <div className="col-sm-1">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() =>
                            copyToClipBoard('some other text to copy')
                        }
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
                                setSkip(false);
                                refetch();
                            }}
                        >
                            Generate
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-4 row">
                <label
                    htmlFor="inputMessage"
                    className="col-sm-2 col-form-label"
                >
                    Your message
                </label>
                <div className="col-sm-10">
                    <input className="form-control" id="inputMessage" />
                </div>
            </div>
            <div className="mb-4 row">
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-success">
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
                        placeholder="hello"
                    ></textarea>{' '}
                </div>
            </div>
        </div>
    );
}
