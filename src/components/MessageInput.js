import React from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { messageSchema } from '../schemas';
import './MessageInput.css';

export const MessageInput = ({ submitMessageInput }) => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setTouched,
    touched,
    validateForm,
    values,
  } = useFormik({
    initialValues: {
      messageInput: '',
    },
    onSubmit: formInputs => {
      setFieldValue('messageInput', '');
      submitMessageInput(formInputs);
    },
    validationSchema: messageSchema,
  });

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <div className="message-input-control">
          <TextField
            autoFocus
            className="message-text-input"
            error={errors.messageInput && touched.messageInput}
            id="message-input"
            onBlur={event => {
              setFieldValue('messageInput', event.target.value.trim());
              handleBlur(event);
            }}
            onChange={handleChange}
            name="messageInput"
            placeholder="Message..."
            value={values.messageInput}
            variant="outlined"
          />
          <Button
            color="primary"
            disabled={!values.messageInput}
            onClick={() => {
              setTouched({
                messageInput: true,
              });
              validateForm();
            }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
