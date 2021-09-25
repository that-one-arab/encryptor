import useFetch from './hooks/useFetch';
import Decrypt from './components/views/decrypt/Decrypt';
import Encrypt from './components/views/encrypt/Encrypt';
import MessageLog from './components/views/message_log/MessageLog';
import Loading from './components/helpers/loading/Loading';
// import { useState } from 'react';

function App() {
    const { data:messages, refetch: refetchMessages } = useFetch('/api/messages');
    return (
        <div className="container-fluid">
            {/* {status === "fetching" && <Loading />} */}
            <div className="row justify-content-around mb-5">
                <div className="col-5">
                    <Encrypt refetchMessages = {refetchMessages} />
                </div>
                <div className="col-5">
                    <Decrypt />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-11">
                    <MessageLog messages = {messages} />
                </div>
            </div>
        </div>
    );
}

export default App;
