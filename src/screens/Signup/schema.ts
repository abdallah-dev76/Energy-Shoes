import * as yup from 'yup';
import { TFunction } from 'i18next';

export const createSignupSchema = (t: TFunction) =>
  yup.object({
    name: yup.string().max(20, t('nameMaxLength')),

    email: yup
      .string()
      .email(t('enterValidEmail'))
      .required(t('emailRequired')),

    password: yup
      .string()
      .required(t('passwordRequired'))
      .min(6, t('passwordMinLength'))
      .max(30, t('passwordMaxLength'))
      .matches(/^[A-Z]/, t('passwordMustStartUppercase')),

    repassword: yup
      .string()
      .required(t('confirmPasswordRequired'))
      .oneOf([yup.ref('password')], t('passwordsDoNotMatch')),

    phone: yup
      .string()
      .transform(value => (value === '' ? undefined : value))
      .matches(/^(010|011|012|015)\d{8}$/, t('enterValidEgyptianPhone')),
  });
