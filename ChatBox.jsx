import { useSelector } from "react-redux";
import Message from "./Message";

const ChatBox = () => {
  const { messages, loading, error } = useSelector((state) => state.chat);

  return (
    <div className="chat-container">
      {messages.map((msg, i) => (
        <Message key={i} message={msg} />
      ))}

      {loading && <p className="loading">Typing...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ChatBox;
