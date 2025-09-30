import { useNavigate } from 'react-router-dom';
import css from './MessageNoStories.module.css';
import AppButton from '../../ui/AppButton/AppButton.jsx';

const MessageNoStories = ({ text, buttonText, route = '/stories' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };
  return (
    <div className={css.container}>
      <p className={css.text}>{text}</p>
      <AppButton
        className={css.button}
        variant="blue"
        type="button"
        onClick={handleClick}
      >
        {buttonText}
      </AppButton>
    </div>
  );
};
export default MessageNoStories;

{
  /* <MessageNoStories
  text="Цей користувач ще не публікував історій"
  buttonText="Назад до історій"
  route=" /stories"
/>; */
}
