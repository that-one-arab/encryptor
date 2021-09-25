export default function MessageLog({ messages }) {
    return (
        <div className='table-responsive'>
            <h1 className='display-6 mb-5'>Messages Log</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>ID</th>
                        <th scope='col'>Original Message</th>
                        <th scope='col'>Encrypted Message</th>
                        <th scope='col'>Private Key</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.data &&
                        messages.data.map((message, i) => {
                            return (
                                <tr key={message.messageID}>
                                    <th scope='row'>{i + 1}</th>
                                    <td>{message.messageID}</td>
                                    <td>{message.originalMessage}</td>
                                    <td>{message.encryptedMessage}</td>
                                    <td>{message.privateKey}</td>
                                    <td>{message.date}</td>
                                    <td>{message.time}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
