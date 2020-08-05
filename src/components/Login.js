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
import { loginSchema } from '../schemas';
import './Login.css';

export const Login = () => {
  const [error, setError] = useState({ showAlert: false, message: '' });
  const { getLogin, loginError, loginLoading } = useContext(AuthContext);

  const handleLogin = ({ username, password }) => {
    getLogin({ username, password });
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
      username: '',
      password: '',
    },
    onSubmit: formInputs => handleLogin(formInputs),
    validationSchema: loginSchema,
  });

  useEffect(() => {
    if (isSubmitting && loginError) {
      setSubmitting(false);
      setError({
        showAlert: true,
        message: 'The username and/or password is incorrect.',
      });
    }
  }, [isSubmitting, loginError, setSubmitting]);

  useEffect(() => {
    if (loginLoading) {
      setError({ showAlert: false, message: '' });
    }
  }, [loginLoading]);

  return (
    <div className="login">
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
          <CardHeader title="Welcome Back" />
          <form onSubmit={handleSubmit}>
            <TextField
              error={errors.username && touched.username}
              fullWidth
              helperText={touched.username && errors.username}
              id="username"
              label="Username"
              name="username"
              onBlur={event => {
                setFieldValue('username', event.target.value.trim());
                handleBlur(event);
              }}
              onChange={handleChange}
              onInvalid={event => {
                event.preventDefault();
              }}
              required
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
              className="login-button"
              color="primary"
              disabled={isSubmitting}
              onClick={() => {
                setTouched({
                  username: true,
                  password: true,
                });
                validateForm();
              }}
              type="submit"
              variant="contained"
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={14} />
                  <span className="submitting">Logging In...</span>
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
