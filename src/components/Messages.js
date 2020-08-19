import React, { useEffect, useRef } from 'react';
import { List } from '@material-ui/core';
import { ChatBubbleOutline } from '@material-ui/icons';
import { Message } from './Message';
import './Messages.css';

export const Messages = ({ currentUser, deleteMessage, messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length) {
      scrollToBottom();
    }
  }, [messages]);

  if (messages.length) {
    return (
      <div className="message-scroller">
        <List className="messages">
          {messages.map(
            ({
              created_at: createdAt,
              message,
              message_id: messageId,
              username,
            }) => (
              <Message
                createdAt={createdAt}
                currentUser={currentUser}
                deleteMessage={deleteMessage}
                key={messageId}
                message={message}
                messageId={messageId}
                username={username}
              />
            ),
          )}
        </List>
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div className="no-messages">
      <ChatBubbleOutline className="no-messages-icon" />
      No messages yet. Send the first message...
    </div>
  );
};
