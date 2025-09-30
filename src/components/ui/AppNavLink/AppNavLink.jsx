import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './AppNavLink.module.css';

/**
 * AppNavLink – універсальний компонент навігаційного посилання.
 *
 * Використовує `react-router-dom/NavLink` для підсвічування активного маршруту
 * і дозволяє передавати додаткові класи для стилізації.
 *
 * @component
 * @example
 * // Приклад використання:
 * <AppNavLink
 *   to="/stories"
 *   label="Історії"
 *   className="custom-link"
 *   activeClassName="custom-active"
 * />
 *
 * @param {string} to Шлях (роут), куди веде посилання.
 * @param {string} label Текст, який відображається у меню.
 * @param {string} [className] Додатковий CSS-клас для базового стану посилання.
 * @param {string} [activeClassName] Додатковий CSS-клас для активного пункту меню (поточна сторінка).
 *
 * @returns {JSX.Element} Посилання з підсвічуванням станів (hover, focus, active, current page).
 */

const AppNavLink = ({ to, label, className, activeClassName }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          styles.navLink,
          className,
          isActive && activeClassName,
          isHome && styles.home
        )
      }
    >
      <span className={styles.label}>{label}</span>
    </NavLink>
  );
};

export default AppNavLink;
