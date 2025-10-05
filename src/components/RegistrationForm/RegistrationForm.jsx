import { registerFormSchema } from '../../validation/authFormsValidation.js';
import { RegisterFormConfig } from '../../constants/formFields.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  showErrorToast,
  showSuccessToast,
} from '../common/AppToastContainer/toastHelpers.jsx';
import { registerUser } from '../../redux/auth/operations.js';
import AuthForm from '../AuthForm/AuthForm.jsx';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, subtitle } = RegisterFormConfig;

  const handleRegister = async (values, actions) => {
    const { confirmPassword: _, ...credentials } = values;

    const { meta, payload } = await dispatch(registerUser(credentials));

    if (meta.requestStatus === 'fulfilled') {
      showSuccessToast('Успішна реєстрація');
      navigate('/');
    } else {
      let message = 'Помилка реєстрації';

      if (payload === 'Email already in use') {
        message = 'Користувач вже зареєстрований';
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
        {...RegisterFormConfig}
        isLogin={false}
        validationSchema={registerFormSchema}
        onSubmitAction={handleRegister}
      />
    </div>
  );
};
export default RegistrationForm;
