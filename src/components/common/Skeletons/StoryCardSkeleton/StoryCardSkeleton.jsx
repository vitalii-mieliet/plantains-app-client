import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import css from './StoryCardSkeleton.module.css';

const StoryCardSkeleton = () => {
  return (
    <div className={css.card}>
      <div className={css.container}>
        <Skeleton className={css.image} />

        <div className={css.content}>
          <Skeleton className={css.category} />
          <Skeleton className={css.title} />
          <Skeleton count={3} className={css.description} />

          <div className={css.meta}>
            <Skeleton circle className={css.avatar} />
            <div className={css.metaText}>
              <Skeleton className={css.name} />
              <div className={css.dateContainer}>
                <Skeleton className={css.date} />
                <Skeleton className={css.dot} />
                <Skeleton className={css.readTime} />
              </div>
            </div>
          </div>
          <div className={css.actions}>
            <Skeleton className={css.button} />
            <Skeleton className={css.iconButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCardSkeleton;
