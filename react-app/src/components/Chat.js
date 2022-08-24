import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  // const channel = useSelector((state) => state.channel)

  useEffect(() => {
    // create websocket/connect
    socket = io();

    // listen for chat events
    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state
      setMessages((messages) => [...messages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    // emit a message
    socket.emit("chat", { user: user.username, user_id: user.id, channel_id: 1, content: chatInput });
    // clear the input field after the message is sent
    setChatInput("");
  };

  // additional code to be added
  return (
    user && (
      <div>
        <div>
          {messages.map((message, ind) => (
            <div key={ind}>{`${message.user}: ${message.content}`}</div>
          ))}
        </div>
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  );
};

export default Chat;
