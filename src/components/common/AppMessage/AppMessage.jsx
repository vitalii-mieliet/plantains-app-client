import css from './AppMessage.module.css';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../ui/AppButton/AppButton';
import useBreakpoint from '../../../hooks/useBreakpoint.js';

const AppMessage = ({ title, message, buttonText, route }) => {
  const navigate = useNavigate();

  const { isMobile } = useBreakpoint();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className={css.container} role="status">
      {title && <h3 className={css.title}>{title}</h3>}
      {message && <p className={css.message}>{message}</p>}
      {buttonText && route && (
        <AppButton
          size={isMobile ? 'sm' : 'md'}
          fullWidth={isMobile}
          variant="blue"
          type="button"
          onClick={handleClick}
        >
          {buttonText}
        </AppButton>
      )}
    </div>
  );
};
export default AppMessage;
{
  /* <AppMessage
  title="Результати відсутні"
  message="За вибраними фільтрами не знайдено жодного результату."
  buttonText="Скинути фільтри"
  route="/filters"
/>; */
}
