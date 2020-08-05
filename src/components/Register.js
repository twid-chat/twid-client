import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../contexts';
import { registerSchema } from '../schemas';
import './Register.css';

export const Register = () => {
  const [error, setError] = useState({ showAlert: false, message: '' });
  const { getRegister, registerError, registerLoading } = useContext(
    AuthContext,
  );

  const handleRegister = ({ email, password, username }) => {
    getRegister({ email, username, password });
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    setSubmitting,
    setTouched,
    touched,
    validateForm,
    values,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    onSubmit: formInputs => handleRegister(formInputs),
    validationSchema: registerSchema,
  });

  useEffect(() => {
    if (isSubmitting && registerError) {
      setSubmitting(false);
      setError({
        showAlert: true,
        message:
          'The username or email address is already in use by another account.',
      });
    }
  }, [isSubmitting, registerError, setSubmitting]);

  useEffect(() => {
    if (registerLoading) {
      setError({ showAlert: false, message: '' });
    }
  }, [registerLoading]);

  return (
    <div className="register">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={prev => setError({ ...prev, showAlert: false })}
        open={error.showAlert}
      >
        <Alert
          onClose={prev => setError({ ...prev, showAlert: false })}
          severity="error"
        >
          {error.message}
        </Alert>
      </Snackbar>
      <Card>
        <CardContent>
          <CardHeader title="Join" />
          <form onSubmit={handleSubmit}>
            <TextField
              error={errors.email && touched.email}
              fullWidth
              helperText={touched.email && errors.email}
              id="email"
              label="Email"
              name="email"
              onBlur={event => {
                setFieldValue('email', event.target.value.trim());
                handleBlur(event);
              }}
              onChange={handleChange}
              onInvalid={event => {
                event.preventDefault();
              }}
              required
              value={values.email}
            />
            <TextField
              error={errors.username && touched.username}
              fullWidth
              helperText={touched.username && errors.username}
              id="username"
              label="Username"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              onInvalid={event => {
                event.preventDefault();
              }}
              required
              type="username"
              value={values.username}
            />
            <TextField
              error={errors.password && touched.password}
              fullWidth
              helperText={touched.password && errors.password}
              id="password"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              onInvalid={event => {
                event.preventDefault();
              }}
              required
              type="password"
              value={values.password}
            />
            <Button
              className="register-button"
              color="primary"
              disabled={isSubmitting}
              onClick={() => {
                setFieldValue('email', values.email.trim());
                setFieldValue('password', values.password.trim());
                setFieldValue('username', values.username.trim());
                setTouched({
                  email: true,
                  password: true,
                  username: true,
                });
                validateForm();
              }}
              type="submit"
              variant="contained"
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={14} />
                  <span className="submitting">Registering...</span>
                </>
              ) : (
                'Register'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
