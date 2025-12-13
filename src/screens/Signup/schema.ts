import * as yup from 'yup';

export const signupSchema = yup.object({
  name: yup.string().max(20, 'Name must be less than 20 characters'),

  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password must be less than 30 characters')
    .matches(/^[A-Z]/, 'Password must start with an uppercase letter'),
});
