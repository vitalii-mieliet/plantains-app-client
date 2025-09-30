import TravellerCard from '../TravellerCard/TravellerCard';
import css from './TravellerList.module.css';
import TravellerCardSkeleton from '../Skeletons/TravellerCardSkeleton/TravellerCardSkeleton';

function TravellerList({ travelers = [], isLoading = false, perPage = 0 }) {
  if (!Array.isArray(travelers)) {
    return null;
  }

  return (
    <ul className={css.cardsGrid}>
      {travelers.map((t) => (
        <li key={t._id} className={css.cardItem}>
          <TravellerCard userData={t} />
        </li>
      ))}
      {isLoading &&
        Array.from({ length: perPage }).map((_, idx) => (
          <li key={`sk-${idx}`} className={css.cardItem}>
            <TravellerCardSkeleton />
          </li>
        ))}
    </ul>
  );
}

export default TravellerList;
