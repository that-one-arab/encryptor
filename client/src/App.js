import { useSelector } from 'react-redux';
import { useFetch } from './hooks/useFetch';
import Decrypt from './components/views/decrypt/Decrypt';
import Encrypt from './components/views/encrypt/Encrypt';
import MessageLog from './components/views/message_log/MessageLog';
import Loading from './components/helpers/loading/Loading';

export default function App() {
    const loading = useSelector((state) => state.loading)
    // Fetch all the existing messages.
    const { response, refetch: refetchMessages } = useFetch({url: '/api/messages'})
    return (
        <div className="container-fluid">
            {loading && <Loading />}
            <div className="row justify-content-around mb-5">
                <div className="col-lg-5">
                    <Encrypt refetchMessages = {refetchMessages} />
                </div>
                <div className="col-lg-5">
                    <Decrypt />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-11">
                    <MessageLog messages = {response} />
                </div>
            </div>
        </div>
    );
}
