export default function MessageLog({ messages }) {
  return (
    <div>
      <h1 className="display-6 mb-5">Messages Log</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Original Message</th>
            <th scope="col">Encrypted Message</th>
            <th scope="col">Private Key</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {
            messages && messages.map((message) => {
              return (
                <tr key = {message.ID} >
                  <th scope="row">{message.ID}</th>
                  <td>{message.ID}</td>
                  <td>{message.original_message}</td>
                  <td>{message.encrypted_message}</td>
                  <td>{message.private_key}</td>
                  <td>{message.date}</td>
                  <td>{message.time}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}
