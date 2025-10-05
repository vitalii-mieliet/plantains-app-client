import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  showErrorToast,
  showSuccessToast,
} from '../common/AppToastContainer/toastHelpers';
import { requestResetEmailSchema } from '../../validation/authFormsValidation';
import { SentResetFormConfig } from '../../constants/formFields';
import { sendResetEmail } from '../../redux/auth/operations';
import AuthForm from '../AuthForm/AuthForm';
import css from './SendResetEmailForm.module.css';

const SendResetEmailForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, subtitle } = SentResetFormConfig;

  const handleSubmit = async (values) => {
    const { meta, payload } = await dispatch(sendResetEmail(values));

    if (meta.requestStatus === 'fulfilled') {
      showSuccessToast('Лист успішно відправлений');
      navigate('/auth/login');
    } else {
      let message = 'Помилка відправлення листа';

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
        {...SentResetFormConfig}
        isLogin={false}
        validationSchema={requestResetEmailSchema}
        onSubmitAction={handleSubmit}
      />
    </div>
  );
};

export default SendResetEmailForm;
