import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  showErrorToast,
  showSuccessToast,
} from '../common/AppToastContainer/toastHelpers.jsx';
import { loginFormSchema } from '../../validation/authFormsValidation.js';
import { LoginFormConfig } from '../../constants/formFields.js';
import { loginUser } from '../../redux/auth/operations.js';
import AuthForm from '../AuthForm/AuthForm.jsx';
import css from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, subtitle } = LoginFormConfig;

  const handleRegister = async (credentials, actions) => {
    const { meta, payload } = await dispatch(loginUser(credentials));

    if (meta.requestStatus === 'fulfilled') {
      showSuccessToast('Логін успішний');
      navigate('/');
    } else {
      let message = 'Помилка логіна';

      if (payload === 'User not found') {
        message = 'Користувача не знайдено';
      } else if (payload === 'Unauthorized') {
        message = 'Невірний пароль';
      }
      showErrorToast(message);
    }

    actions.setSubmitting(false);
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.text}>{subtitle}</p>

      <AuthForm
        {...LoginFormConfig}
        isLogin={true}
        validationSchema={loginFormSchema}
        onSubmitAction={handleRegister}
      />
    </div>
  );
};

export default LoginForm;
