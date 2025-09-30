import AppButton from '../../ui/AppButton/AppButton';
import styles from './StoryCard.module.css';
import clsx from 'clsx';
import BookmarkIcon from '../../../assets/icons/bookmark.svg?react';
import EditIcon from '../../../assets/icons/edit.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { saveStory, unsaveStory } from '../../../redux/user/operations';
import { selectSavedStoriesIds } from '../../../redux/user/selectors';
import imageUrl from '../../../assets/images/placeholder/Placeholder.webp';
import authorAvatarUrl from '../../../assets/icons/AvatarImage.svg';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };

  return new Intl.DateTimeFormat('uk-UA', options)
    .format(date)
    .replace(' р.', '')
    .replace('.', '');
};

const StoryCard = ({ storyInfo, variant = 'normal' }) => {
  const dispatch = useDispatch();
  const savedStoriesIds = useSelector(selectSavedStoriesIds);

  if (!storyInfo) return null;

  const { _id, img, category, title, article, owner, date, rate } = storyInfo;

  const isSaved =
    Array.isArray(savedStoriesIds) && savedStoriesIds.includes(_id);

  const handleBookmarkClick = () => {
    if (isSaved) {
      dispatch(unsaveStory(_id));
    } else {
      dispatch(saveStory(_id));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={img || imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <p className={styles.category}>{category}</p>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{article}</p>
        </div>
        <div className={styles.authorBlock}>
          <div className={styles.imageWrapper}>
            <img
              src={owner?.avatar || authorAvatarUrl}
              alt={owner?.name || 'Автор'}
              className={styles.authorAvatar}
            />
          </div>
          <div className={styles.authorDetails}>
            <p className={styles.authorName}>
              {owner?.name || 'Невідомий автор'}
            </p>
            <div className={styles.meta}>
              <span className={styles.date}>{formatDate(date)}</span>
              <sub className={styles.bullet}>&bull;</sub>
              <div className={styles.saves}>
                <span className={styles.rate}>{rate || 0}</span>
                <BookmarkIcon className={styles.bookmarkIcon} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <AppButton
            href={`/stories/${_id}`}
            variant="grey"
            className={styles.viewButton}
          >
            Переглянути статтю
          </AppButton>
          <AppButton
            aria-label={
              isSaved ? 'Видалити із збережених' : 'Додати в збережені'
            }
            className={clsx(
              styles.iconButton,
              isSaved ? styles.saved : styles.normal
            )}
            onClick={variant !== 'own' ? handleBookmarkClick : undefined}
          >
            {variant === 'own' ? <EditIcon /> : <BookmarkIcon />}
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
