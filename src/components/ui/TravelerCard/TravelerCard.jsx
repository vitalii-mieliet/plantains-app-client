import React, { useState } from 'react';
import css from './TravelerCard.module.css';
import placeholder from '../../../assets/images/placeholder.png';
import avatarPlaceholder from '../../../assets/icons/AvatarImage.svg';
import bookmark from '../../../assets/icons/Bookmark.svg';
import editIcon from '../../../assets/icons/edit.svg';
function TravelerCard({
  photo,
  category,
  title,
  description,
  fullName,
  date,
  views,
  avatar,
  isOwner = false,
}) {
  const [isActive, setIsActive] = useState(false); // ✅ стейт для активной иконки

  const img = photo ? photo : placeholder;
  const userAvatar = avatar ? avatar : avatarPlaceholder;

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={css.travelerCart}>
      <img src={img} alt="Traveler" className={css.travelerImg} />
      <div className={css.trevelerInfo}>
        <div className={css.blogInfoWrapper}>
          <div className={css.category}>{category || 'Category'}</div>
          <div className={css.blogTittle}>
            {title || 'Blog title heading will go here '}
          </div>
          <div className={css.blogInfo}>
            {description ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'}
          </div>
        </div>

        <div className={css.travelerDetails}>
          <img src={userAvatar} alt="" className={css.travelerDetailsImg} />
          <div>
            <div>{fullName || 'Full name'}</div>
            <div className={css.dateViews}>
              {date || '11 Jan 2022 '}
              <span className={css.spanViews}>•</span>
              <div className={css.views}>
                {views || 0}
                <img src={bookmark} alt="" width="16" height="17" />
              </div>
            </div>
          </div>
        </div>

        <div className={css.trevelLink}>
          <button className={css.btnState}>Переглянути статтю</button>

          {isOwner ? (
            <button className={css.btnIcon}>
              <img src={editIcon} alt="Edit" className={css.icon} />
            </button>
          ) : (
            <button
              className={`${css.btnIcon} ${isActive ? css.active : ''}`}
              onClick={toggleActive}
            >
              <img src={bookmark} alt="Bookmark" className={css.icon} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TravelerCard;
