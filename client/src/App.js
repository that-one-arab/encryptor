import useFetch from './hooks/useFetch';
import Decrypt from './components/views/decrypt/Decrypt';
import Encrypt from './components/views/encrypt/Encrypt';
import MessageLog from './components/views/message_log/MessageLog';
import Loading from './components/helpers/loading/Loading';
import { useState } from 'react';

function App() {
    const { status, data } = useFetch('/messages');
    // const [messages, setMessages] = useState([])
    // setMessages(data)
    console.table('data: ', data);
    return (
        <div className="container-fluid">
            {status === "fetching" && <Loading />}
            <div className="row justify-content-around mb-5">
                <div className="col-5">
                    <Encrypt />
                </div>
                <div className="col-5">
                    <Decrypt />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-11">
                    <MessageLog messages = {data} />
                </div>
            </div>
        </div>
    );
}

export default App;
