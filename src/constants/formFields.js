export const RegisterFormConfig = {
  title: 'Реєстрація',
  subtitle: 'Раді вас бачити у спільноті мандрівників!',
  submitText: 'Зареєструватись',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Ім’я та прізвище',
      placeholder: 'Введіть ім’я та прізвище',
      required: true,
      autoComplete: 'name',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Введіть email',
      required: true,
      autoComplete: 'email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Пароль',
      placeholder: 'Введіть пароль',
      required: true,
      autoComplete: 'new-password',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Підтвердження пароля',
      placeholder: 'Повторіть пароль',
      required: true,
      autoComplete: 'new-password',
    },
  ],
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

export const LoginFormConfig = {
  title: 'Вхід',
  subtitle: 'Вітаємо знову у спільноті мандрівників!',
  submitText: 'Увійти',
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Введіть email',
      required: true,
      autoComplete: 'email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Пароль',
      placeholder: 'Введіть пароль',
      required: true,
      autoComplete: 'current-password',
    },
  ],
  initialValues: {
    email: '',
    password: '',
  },
};
