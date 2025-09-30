import * as Yup from 'yup';

export const loginFormSchema = Yup.object({
  email: Yup.string()
    .max(64, 'Email має містити максимум 64 символи')
    .email('Введіть коректну електронну адресу')
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .max(128, 'Пароль має містити максимум 128 символів')
    .required("Пароль обов'язковий"),
});

export const registerFormSchema = Yup.object({
  name: Yup.string()
    .max(32, 'Ім’я має містити максимум 32 символи')
    .required("Ім’я обов'язкове"),
  email: Yup.string()
    .max(64, 'Email має містити максимум 64 символи')
    .email('Введіть коректну електронну адресу')
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .max(128, 'Пароль має містити максимум 128 символів')
    .required("Пароль обов'язковий"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Паролі повинні збігатися')
    .required('Підтвердження пароля обов’язкове'),
});
