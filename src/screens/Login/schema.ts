import * as yup from 'yup';
import { TFunction } from 'i18next';

export const createLoginSchema = (t: TFunction) =>
  yup.object({
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
  });
