import { useFetch } from '../../../hooks/useFetch';
/**
 * @async @function copyToClipboard
 * @summary Copies data to the clipboard
 * @param {*} data data to be copied
 */
const copyToClipBoard = async (data) => {
    await navigator.clipboard.writeText(data);
};

/**
 * @component
 * @summary Private Key generator field
 * @param {object} pkResponse the private key response object containing the private key
 * @param {function} fetchPrivateKey callback function to fetch a private key
 */
export default function PrivateKeyGen({ privateKey, setPrivateKey }) {
    // define the fetch callback function
    const callFetch = useFetch({ onEvent: true });

    // define the privatekey handler
    const handlePrivateKey = async () => {
        const response = await callFetch({ callbackURL: '/api/generate-key' });
        setPrivateKey(response.data);
    };

    return (
        <div className='mb-4 row'>
            <label className='col-sm-2 col-form-label'>Private Key</label>
            <div className='col-lg-7'>
                <input
                    className='form-control'
                    value={privateKey}
                    placeholder='Generate a private key for encryption'
                    readOnly
                />
            </div>
            <div className='col-lg-1'>
                <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={() => copyToClipBoard(privateKey)}
                >
                    <i className='far fa-clipboard'></i>
                </button>
            </div>
            <div className='col-lg-2'>
                <div className='d-grid gap-2'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={handlePrivateKey}
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}
