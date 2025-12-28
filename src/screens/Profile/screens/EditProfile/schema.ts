import * as yup from 'yup';

export const ediProfileSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .max(20, 'Name must be less than 20 characters')
    .matches(/^\S+$/, 'No spaces allowed'),

  lastName: yup
    .string()
    .transform(value => (value === '' ? undefined : value))
    .max(20, 'Name must be less than 20 characters')
    .matches(/^\S+$/, 'No spaces allowed'),

  email: yup.string().required('Email required').email('Enter a valid email'),

  phone: yup
    .string()
    .transform(value => (value === '' ? undefined : value))
    .matches(
      /^(010|011|012|015)[0-9]{8}$/,
      'Enter a valid Egyptian phone number',
    ),
});
