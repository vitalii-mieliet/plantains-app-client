import { useDispatch } from 'react-redux';
import { getGoogleAuthUrl } from '../../redux/auth/operations.js';
import { FaGoogle } from 'react-icons/fa';
import useBreakpoint from '../../hooks/useBreakpoint.js';
import AppButton from '../../components/ui/AppButton/AppButton.jsx';
import css from './OAuthComponents.module.css';

const OAuthComponents = () => {
  const { isMobile } = useBreakpoint();
  const dispatch = useDispatch();

  const handleClick = async () => {
    const resultAction = await dispatch(getGoogleAuthUrl());
    if (getGoogleAuthUrl.fulfilled.match(resultAction)) {
      const authUrl = resultAction.payload.url;
      if (authUrl) {
        window.location.href = authUrl;
      }
    }
  };

  return (
    <div className={css.container}>
      <p className={css.aboText}>або</p>
      <AppButton
        size={isMobile ? 'sm' : 'md'}
        fullWidth
        variant="blue"
        type="button"
        className={css.button}
        onClick={handleClick}
      >
        <span className={css.buttonContent}>
          Увійти через Google
          <FaGoogle />
        </span>
      </AppButton>
    </div>
  );
};

export default OAuthComponents;
