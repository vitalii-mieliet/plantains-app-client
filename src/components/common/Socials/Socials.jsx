import clsx from 'clsx';
import sprite from '../../../assets/icons/sprite.svg';
import { SOCIAL_LINKS } from '../../../constants/socialLinks';
import styles from './Socials.module.css';

/**
 * Socials – універсальний компонент для відображення списку посилань на соціальні мережі.
 *
 * Використовує масив `SOCIAL_LINKS` (id, href, label),
 * що винесений у `constants/socialLinks.js`.
 * Іконки підтягуються зі спрайту `sprite.svg` і наслідують колір через `currentColor`.
 *
 * Особливості:
 * - Підтримує розміри іконок через проп `iconSize` (`'sm' | 'md' | 'lg'`).
 * - Додає `aria-label` та `title` для кращої доступності та hover-підказок.
 * - При фокусі (`:focus-visible`) додає обводку і фон для зручності клавіатурної навігації.
 * - Підтримує додаткові стилі списку через проп `listStyle`.
 *
 * @component
 * @example
 * // Приклад використання у футері
 * import Socials from '../ui/Socials/Socials';
 *
 * const Footer = () => (
 *   <footer>
 *     <Socials iconSize="sm" />
 *   </footer>
 * );
 *
 * @param {Object} props - Пропси компонента
 * @param {'sm' | 'md' | 'lg'} [props.iconSize='md'] - Розмір іконок соціальних мереж
 * @param {string} [props.listStyle] - Додатковий клас для стилізації контейнера <ul>
 */

const Socials = ({ listStyle, iconSize = 'md' }) => {
  return (
    <ul className={clsx(styles.socials, listStyle)}>
      {SOCIAL_LINKS.map(({ id, href, label }) => (
        <li key={id}>
          <a
            className={styles.link}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
          >
            <svg
              aria-hidden="true"
              className={clsx(styles.socialIcon, styles[iconSize])}
            >
              <use href={`${sprite}#${id}`} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
