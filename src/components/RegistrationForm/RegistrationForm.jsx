import { registerFormSchema } from '../../validation/authFormsValidation.js';
import { RegisterFormConfig } from '../../constants/formFields.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations.js';
import AuthForm from '../AuthForm/AuthForm.jsx';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, subtitle } = RegisterFormConfig;

  const handleRegister = async (values, actions) => {
    try {
      const { confirmPassword: _, ...credentials } = values;

      dispatch(registerUser(credentials));

      navigate('/');
    } catch {
      console.error('Помилка при реєстрації'); // замінити на тост
      actions.setSubmitting(false);
    }
  };
  return (
    <div className={css.container}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.text}>{subtitle}</p>

      <AuthForm
        {...RegisterFormConfig}
        validationSchema={registerFormSchema}
        onSubmitAction={handleRegister}
      />
    </div>
  );
};
export default RegistrationForm;
