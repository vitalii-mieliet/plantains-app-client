import sprite from '../../../assets/icons/sprite.svg';
import styles from './SliderArrows.module.css';

const SliderArrows = ({
  isPrevDisabled,
  isNextDisabled,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className={styles.sliderArrows}>
      <button
        className={styles.arrowButton}
        disabled={isPrevDisabled}
        onClick={onPrevClick}
        aria-label="Return to previous slide"
        type="button"
      >
        <svg className={styles.arrow}>
          <use href={`${sprite}#arrow_back`} />
        </svg>
      </button>
      <button
        className={styles.arrowButton}
        disabled={isNextDisabled}
        onClick={onNextClick}
        aria-label="Go to the next slide"
        type="button"
      >
        <svg className={styles.arrow}>
          <use href={`${sprite}#arrow_forward`} />
        </svg>
      </button>
    </div>
  );
};

export default SliderArrows;
