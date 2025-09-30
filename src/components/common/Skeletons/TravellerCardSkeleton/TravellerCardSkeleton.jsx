import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import css from './TravellerCardSkeleton.module.css';

const TravellerCardSkeleton = () => {
  return (
    <article className={css.card}>
      <div className={css.cardInner}>
        <Skeleton circle width={112} height={113} className={css.avatar} />
        <Skeleton className={css.name} />
        <Skeleton count={3} className={css.bio} />
        <Skeleton className={css.button} />
      </div>
    </article>
  );
};

export default TravellerCardSkeleton;
