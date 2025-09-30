import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginFormSchema } from '../../validation/authFormsValidation.js';
import { LoginFormConfig } from '../../constants/formFields.js';
import AuthForm from '../AuthForm/AuthForm.jsx';
import css from './LoginForm.module.css';
import { loginUser } from '../../redux/auth/operations.js';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, subtitle } = LoginFormConfig;

  const handleRegister = async (credentials, actions) => {
    try {
      dispatch(loginUser(credentials));

      navigate('/');
    } catch {
      console.error('Помилка при реєстрації'); // замінити на тост
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <div className={css.container}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.text}>{subtitle}</p>

      <AuthForm
        {...LoginFormConfig}
        validationSchema={loginFormSchema}
        onSubmitAction={handleRegister}
      />
    </div>
  );
};

export default LoginForm;
