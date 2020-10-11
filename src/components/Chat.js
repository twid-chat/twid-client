import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { SocketContext, UserContext } from '../contexts';
import { Loader } from './Loader';
import { Messages } from './Messages';
import { MessageInput } from './MessageInput';

import './Chat.css';

export const Chat = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);
  const { userData } = useContext(UserContext);

  socket.on('get-messages', allMessages => {
    setMessages(allMessages);
    setLoading(false);
  });

  const submitMessageInput = ({ messageInput }) => {
    socket.emit('new-message', messageInput, allMessages => {
      setMessages(allMessages);
    });
  };

  const deleteMessage = messageId => {
    socket.emit('delete-message', messageId, allMessages => {
      setMessages(allMessages);
    });
  };

  useEffect(() => {
    socket.emit('get-messages');
  }, [socket]);

  if (loading) {
    return <Loader size={64} />;
  }

  return (
    <div className="chat">
      {messages ? (
        <Messages
          currentUser={userData}
          deleteMessage={deleteMessage}
          messages={messages}
        />
      ) : (
        <div className="loading">
          <CircularProgress size={64} />
        </div>
      )}
      <MessageInput submitMessageInput={submitMessageInput} />
    </div>
  );
};
