import * as yup from 'yup';

export const checkoutSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),

  phone: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^(010|011|012|015)[0-9]{8}$/,
      'Enter a valid Egyptian phone number',
    ),

  country: yup.string().required('Country is required'),

  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),

  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),

  address: yup
    .string()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required'),

  apartment: yup.string().optional(),

  city: yup.string().required('City is required'),

  postalCode: yup
    .string()
    .matches(/^[0-9]{4,10}$/, 'Please enter a valid postal code')
    .optional(),

  paymentMethod: yup
    .string()
    .oneOf(['cod', 'card'], 'Please select a payment method')
    .required('Payment method is required'),

  // Card fields (conditional based on payment method)
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^\d{19}$/, 'Card number must be 16 digits'),

  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format'),

  cvv: yup
    .string()
    .required('CVV is required')
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),

  cardName: yup
    .string()
    .required('Cardholder name is required')
    .min(3, 'Name is too short'),
});
