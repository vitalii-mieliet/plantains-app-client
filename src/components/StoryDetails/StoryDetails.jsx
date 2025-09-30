import { useDispatch, useSelector } from 'react-redux';
import { saveStory, unsaveStory } from '../../redux/user/operations';
import { selectSavedStoriesIds } from '../../redux/user/selectors';
import AppButton from '../../components/ui/AppButton/AppButton';
import styles from './StoryDetails.module.css';
import clsx from 'clsx';
import Section from '../common/Section/Section';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import placeholder from '../../assets/images/placeholder/Placeholder.webp';
import { useState } from 'react';
import InfoModal from '../common/InfoModal/InfoModal';
import { useNavigate } from 'react-router-dom';

const StoryDetails = ({ storyData }) => {
  const [ismodalOpen, setIsmodalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedStoriesIds = useSelector(selectSavedStoriesIds);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!storyData) {
    return null;
  }

  const { _id, img, category, title, article, fullText, owner, date } =
    storyData;

  const isSaved =
    Array.isArray(savedStoriesIds) && savedStoriesIds.includes(_id);

  // handler
  const handleOpenModal = () => {
    setIsmodalOpen(true);
  };

  const handleBookmarkClick = () => {
    if (isSaved) {
      dispatch(unsaveStory(_id));
    } else {
      dispatch(saveStory(_id));
    }
  };

  const authorName = owner?.name || 'Невідомий автор';
  const formattedDate = new Date(date)
    .toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace(' р.', '');

  return (
    <Section className={styles.pageSection}>
      <article>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <div className={styles.metaLeft}>
              <div className={styles.metaItem}>
                <p className={styles.metaLabel}>Автор статті</p>
                <p className={styles.metaValue}>{authorName}</p>
              </div>
              <div className={styles.metaItem}>
                <p className={styles.metaLabel}>Опубліковано</p>
                <p className={styles.metaValue}>{formattedDate}</p>
              </div>
            </div>
            <div className={styles.metaRight}>
              <p className={styles.category}>{category}</p>
            </div>
          </div>
        </header>
        <img
          src={img || placeholder}
          alt={title}
          className={styles.mainImage}
        />
        <div className={styles.mainContent}>
          <div
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: article }}
          />
          <aside
            className={styles.saveSection}
            aria-labelledby="зберегти-історію-заголовок"
          >
            <h3 id="зберегти-історію-заголовок" className={styles.saveTitle}>
              {isSaved ? 'Історія збережена!' : 'Збережіть собі історію'}
            </h3>
            <p className={styles.saveText}>
              {!isSaved
                ? 'Вона буде доступна у Вашому профілі у розділі "Збережене".'
                : ''}
            </p>

            {!isLoggedIn ? (
              <AppButton
                onClick={handleOpenModal}
                className={styles.saveButton}
              >
                Зберегти
              </AppButton>
            ) : (
              <AppButton
                className={clsx(
                  styles.saveButton,
                  isSaved && styles.saveButtonWithMargin
                )}
                onClick={handleBookmarkClick}
              >
                {isSaved ? 'Видалити зі збережених' : 'Зберегти'}
              </AppButton>
            )}

            {isSaved ? (
              <AppButton
                className={styles.lookStoriesBtn}
                href="/profile/saved-stories"
              >
                Переглянути збережені
              </AppButton>
            ) : (
              ''
            )}
          </aside>
        </div>

        {ismodalOpen && (
          <InfoModal
            isOpen={ismodalOpen}
            title="Помилка під час збереження"
            text="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь."
            cancelButtonText="Увійти"
            onCancel={() => {
              setIsmodalOpen(false);
              navigate('/auth/login');
            }}
            confirmButtonText="Зареєструватись"
            onConfirm={() => {
              setIsmodalOpen(false);
              navigate('/auth/register');
            }}
            onClose={() => setIsmodalOpen(false)}
          />
        )}
        <div
          className={styles.fullText}
          dangerouslySetInnerHTML={{ __html: fullText }}
        />
      </article>
    </Section>
  );
};

export default StoryDetails;
