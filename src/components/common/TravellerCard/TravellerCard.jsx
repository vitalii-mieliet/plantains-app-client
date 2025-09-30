import React from 'react';
import css from './TravellerCard.module.css';
import avatarPlaceholder from '../../../assets/icons/AvatarImage.svg';
import AppButton from '../../ui/AppButton/AppButton';

function TravellerCard({ userData = {} }) {
  const { avatar, name, bio, _id } = userData;

  name.trim();
  let displayName = name.length > 18 ? name.slice(0, 15) + '...' : name;

  return (
    <article className={css.travelerInfoCard}>
      <img
        src={avatar || avatarPlaceholder}
        width={112}
        height={112}
        alt={name || 'Avatar'}
        className={css.imgPlaceholder}
      />
      <div className={css.infoBlock}>
        <h2 className={css.name}>{displayName || 'Full name'}</h2>
        <p className={css.bio}>
          {bio ||
            'adipisicing elit. Id, impedit error. Libero aspernatur quo a.'}
        </p>

        <div className={css.btn}>
          <AppButton
            href={`/travellers/${_id}`}
            variant="grey"
            fullWidth={true}
          >
            Переглянути профіль
          </AppButton>
        </div>
      </div>
    </article>
  );
}

export default TravellerCard;
