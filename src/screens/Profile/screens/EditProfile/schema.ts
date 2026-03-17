import * as yup from 'yup';
import { TFunction } from 'i18next';

export const createEditProfileSchema = (t: TFunction) =>
  yup.object({
    firstName: yup
      .string()
      .required(t('firstNameRequired'))
      .max(20, t('nameMaxLength'))
      .matches(/^\S+$/, t('noSpacesAllowed')),

    lastName: yup
      .string()
      .transform(value => (value === '' ? undefined : value))
      .max(20, t('nameMaxLength'))
      .matches(/^\S+$/, t('noSpacesAllowed')),

    email: yup
      .string()
      .required(t('emailRequiredShort'))
      .email(t('enterValidEmail')),

    phone: yup
      .string()
      .transform(value => (value === '' ? undefined : value))
      .matches(/^(010|011|012|015)\d{8}$/, t('enterValidEgyptianPhone')),
  });
