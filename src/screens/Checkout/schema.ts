import * as yup from 'yup';
import { TFunction } from 'i18next';

export const createCheckoutSchema = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .email(t('pleaseEnterValidEmail'))
      .required(t('emailRequired')),

    phone: yup
      .string()
      .required(t('phoneNumberRequired'))
      .matches(/^(010|011|012|015)[0-9]{8}$/, t('enterValidEgyptianPhone')),

    country: yup.string().required(t('countryRequired')),

    city: yup.string().required(t('cityRequired')),

    firstName: yup
      .string()
      .min(2, t('firstNameMinLength'))
      .max(50, t('firstNameMaxLength'))
      .required(t('firstNameRequired')),

    lastName: yup
      .string()
      .min(2, t('lastNameMinLength'))
      .max(50, t('lastNameMaxLength'))
      .required(t('lastNameRequired')),

    address: yup
      .string()
      .min(10, t('addressMinLength'))
      .required(t('addressRequired')),

    apartment: yup.string().notRequired(),

    postalCode: yup
      .string()
      .matches(/^[0-9]{4,10}$/, t('pleaseEnterValidPostalCode'))
      .notRequired(),

    paymentMethod: yup
      .string()
      .oneOf(['cod', 'card'], t('pleaseSelectPaymentMethod'))
      .required(t('paymentMethodRequired')),

    // Card fields (conditional based on payment method)
    cardNumber: yup
      .string()
      .transform(value => value?.replace(/\s/g, '')) // remove spaces
      .when('paymentMethod', {
        is: 'card',
        then: schema =>
          schema
            .required(t('cardNumberRequired'))
            .matches(/^\d{16}$/, t('cardNumberMust16Digits')),
        otherwise: schema => schema.notRequired(),
      }),

    expiryDate: yup.string().when('paymentMethod', {
      is: 'card',
      then: schema =>
        schema
          .required(t('expiryDateRequired'))
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, t('useMMYYFormat')),
      otherwise: schema => schema.notRequired(),
    }),

    cvv: yup.string().when('paymentMethod', {
      is: 'card',
      then: schema =>
        schema
          .required(t('cvvRequired'))
          .matches(/^\d{3,4}$/, t('cvvMust3or4Digits')),
      otherwise: schema => schema.notRequired(),
    }),

    cardName: yup.string().when('paymentMethod', {
      is: 'card',
      then: schema =>
        schema.required(t('cardholderNameRequired')).min(3, t('nameTooShort')),
      otherwise: schema => schema.notRequired(),
    }),
  });
