const Message = ({ message }) => {
  return (
    <div className={message.role === "user" ? "user-msg" : "ai-msg"}>
      {message.content}
    </div>
  );
};

export default Message;
