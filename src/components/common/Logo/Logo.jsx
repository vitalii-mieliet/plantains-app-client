import sprite from '../../../assets/icons/sprite.svg';
import styles from './Logo.module.css';
import clsx from 'clsx';

/**
 * Компонент Logo — відображає SVG-логотип із спрайту.
 *
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {string} [props.link='/'] - Посилання, куди веде логотип (за замовчуванням — головна сторінка).
 * @param {'light' | 'dark'} [props.variant='dark'] - Візуальний стиль логотипа (світлий або темний).
 * @param {string} [props.className] - Додатковий CSS-клас для стилізації контейнера.
 *
 * @example
 * // Логотип у темному стилі, що веде на головну
 * <Logo />
 *
 * @example
 * // Логотип у світлому стилі для футера
 * <Logo link="/about" variant="light" className="footerLogo" />
 */

const Logo = ({ link = '/', variant = 'dark', className }) => {
  return (
    <a
      href={link}
      className={clsx(styles.logo, styles[`logo--${variant}`], className)}
    >
      <svg width={156} height={40} className={styles.logoIcon}>
        <use href={`${sprite}#logo_text`} />
      </svg>
    </a>
  );
};

export default Logo;
