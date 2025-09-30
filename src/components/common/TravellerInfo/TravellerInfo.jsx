import React from 'react';
import PropTypes from 'prop-types';
import styles from './TravellerInfo.module.css';

import placeholderAvatar from '../../../assets/images/TravellerInfo-img/TravellerInfo.webp';
import clsx from 'clsx';

/**
 * Компонент `TravellerInfo` — відображає основну інформацію про мандрівника:
 * аватар, ім'я та біографію (якщо є).
 *
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {Object} props.user - Дані мандрівника.
 * @param {string} props.user.name - Ім'я мандрівника (обов’язкове).
 * @param {string} [props.user.avatar] - URL аватара мандрівника.
 * @param {string} [props.user.photoUrl] - Альтернативний URL аватара.
 * @param {string} [props.user.bio] - Коротка біографія мандрівника.
 * @param {string} [props.className] - Додатковий CSS-клас для контейнера.
 *
 * @example
 * // Приклад використання:
 * <TravellerInfo
 *   user={{
 *     name: "Іван Петренко",
 *     avatar: "https://example.com/avatar.jpg",
 *     bio: "Люблю подорожувати горами і пустелями."
 *   }}
 *   className="customClass"
 * />
 */
const TravellerInfo = ({ user, className }) => {
  if (!user) return null;

  const avatarSrc = user.avatar || user.photoUrl || placeholderAvatar;
  const altText = user.name || 'Traveller avatar';

  return (
    <div className={clsx(styles.travellerInfo, className)}>
      <img className={styles.avatar} src={avatarSrc} alt={altText} />

      <div className={styles.info}>
        <h1 className={styles.name}>{user.name}</h1>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
      </div>
    </div>
  );
};

TravellerInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    photoUrl: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

export default TravellerInfo;
