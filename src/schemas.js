import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .max(74, 'Email address must be less than 75 characters')
    .email('Invalid email address')
    .required('Email address is required'),
  username: yup
    .string()
    .trim()
    .min(2, 'Username must be at least 2 characters')
    .max(49, 'Username must be less than 50 characters')
    .matches(/^\S*$/, 'Username must not contain spaces')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(49, 'Password must be less than 50 characters')
    .required('Password is required'),
});

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(2, 'Username must be at least 2 characters')
    .max(49, 'Username must be less than 50 characters')
    .matches(/^\S*$/, 'Username must not contain spaces')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(49, 'Password must be less than 50 characters')
    .required('Password is required'),
});

export const messageSchema = yup.object().shape({
  messageInput: yup.string().trim().min(1).max(500),
});
