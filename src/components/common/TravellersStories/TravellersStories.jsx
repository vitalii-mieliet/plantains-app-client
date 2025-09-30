import StoryCard from '../StoryCard/StoryCard';
import styles from './TravellersStories.module.css';
import StoryCardSkeleton from '../Skeletons/StoryCardSkeleton/StoryCardSkeleton';

const TravellersStories = ({ stories, isLoading = false, perPage = 0 }) => {
  // перший екран завантаження
  if (isLoading && (!Array.isArray(stories) || stories.length === 0)) {
    return (
      <ul className={styles.storiesGrid}>
        {Array.from({ length: perPage }).map((_, idx) => (
          <li key={`sk-initial-${idx}`} className={styles.storyItem}>
            <StoryCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  // якщо немає історій і завантаження завершено
  if (!Array.isArray(stories) || stories.length === 0) {
    return <p>Наразі немає доступних історій.</p>;
  }

  return (
    <ul className={styles.storiesGrid}>
      {stories.map((story) => (
        <li key={story._id} className={styles.storyItem}>
          <StoryCard storyInfo={story} isOwner={false} />
        </li>
      ))}
      {/* при завантаженні показ скелетів внизу */}
      {isLoading &&
        Array.from({ length: perPage }).map((_, idx) => (
          <li key={`sk-${idx}`} className={styles.storyItem}>
            <StoryCardSkeleton />
          </li>
        ))}
    </ul>
  );
};

export default TravellersStories;
