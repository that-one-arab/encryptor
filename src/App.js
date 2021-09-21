import Decrypt from "./components/decrypt/Decrypt";
import Encrypt from "./components/encrypt/Encrypt";
import MessageLog from "./components/message_log/MessageLog";

function App() {
  return (
    <div className="container-fluid">
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
          <MessageLog />
        </div>
      </div>
    </div>
  );
}

export default App;
