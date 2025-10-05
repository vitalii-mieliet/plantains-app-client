import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  showErrorToast,
  showSuccessToast,
} from '../common/AppToastContainer/toastHelpers';
import { resetPasswordFormSchema } from '../../validation/authFormsValidation';
import { ResetPasswordFormConfig } from '../../constants/formFields';
import { resetPassword } from '../../redux/auth/operations';
import AuthForm from '../AuthForm/AuthForm';
import css from './ResetPasswordForm.module.css';

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const token = params.get('token');
  const { title, subtitle } = ResetPasswordFormConfig;

  const handleSubmit = async (values) => {
    const { password } = values;
    const { meta, payload } = await dispatch(
      resetPassword({ token, password })
    );

    if (meta.requestStatus === 'fulfilled') {
      showSuccessToast('Пароль успішно змінений');
      navigate('/auth/login');
    } else {
      let message = 'Помилка скиду пароля';

      if (payload === 'User not found') {
        message = 'Користувача не знайдено';
      }
      showErrorToast(message);
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.text}>{subtitle}</p>

      <AuthForm
        {...ResetPasswordFormConfig}
        isLogin={false}
        validationSchema={resetPasswordFormSchema}
        onSubmitAction={handleSubmit}
      />
    </div>
  );
};

export default ResetPasswordForm;
