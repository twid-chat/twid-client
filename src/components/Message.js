import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { Button, ListItem, ListItemText, Popover } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import './Message.css';

export const Message = ({
  createdAt,
  currentUser,
  deleteMessage,
  message,
  messageId,
  username,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [messagePopoverOpen, setMessagePopoverOpen] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setMessagePopoverOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMessagePopoverOpen(false);
  };

  const date = DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL);
  const time = DateTime.fromISO(createdAt).toLocaleString(DateTime.TIME_SIMPLE);

  const renderMessage = () => (
    <>
      <span className="username">{username}</span>
      <span className="timestamp">{`${date} at ${time}`}</span>
      <div className="message">{message}</div>
    </>
  );

  return (
    <ListItem key={messageId}>
      <ListItemText primary={renderMessage()} />
      {username === currentUser.username && (
        <>
          <Button onClick={handleClick}>
            <MoreHoriz />
          </Button>
          <MessagePopover
            anchorEl={anchorEl}
            deleteMessage={deleteMessage}
            handleClose={handleClose}
            id={messageId}
            open={messagePopoverOpen}
          />
        </>
      )}
    </ListItem>
  );
};

const MessagePopover = ({ anchorEl, deleteMessage, handleClose, id, open }) => (
  <Popover
    anchorEl={anchorEl}
    id="message-popover"
    onClose={handleClose}
    open={open}
  >
    <Button
      onClick={() => {
        deleteMessage(id);
        handleClose();
      }}
    >
      Delete
    </Button>
  </Popover>
);
