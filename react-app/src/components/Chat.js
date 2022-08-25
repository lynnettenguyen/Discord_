import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import './CSS/ChannelPage.css'

let socket;

const Chat = ({ channelId }) => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [channelChange, setChannelChange] = useState(false);
  const user = useSelector((state) => state.session.user);
  const server = useSelector(state => state.server)

  useEffect(() => {
    // create websocket/connect
    socket = io();

    // listen for chat events

    console.log('CONNECTED')
    socket.on('chat', (chat) => {
      // when we recieve a chat, add it into our messages array in state
      setMessages((messages) => [...messages, chat]);
    });
    // when component unmounts, disconnect
    return (() => {
      console.log('DISCONNECTING')
      socket.disconnect();
    });
  }, [server]);


  useEffect(() => {
    setChannelChange(true)
  }, [channelId]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    // emit a message
    socket.emit('chat', { user: user.username, user_id: user.id, channel_id: `${channelId}`, content: chatInput });
    // clear the input field after the message is sent
    setChatInput("");
  };

  // additional code to be added
  return channelChange && (
    user && (
      <div>
        <div>
          {messages.map((message, i) => `${channelId}` === message.channel_id && (
            <div className='channel-messages' key={i}>{`${message.user}: ${message.content}`}</div>
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
