import AppNavLink from '../../ui/AppNavLink/AppNavLink';
import styles from './Navigation.module.css';

/**
 * Navigation – компонент для відображення основного меню сайту.
 *
 * Рендерить список навігаційних пунктів на базі `AppNavLink`, який побудований
 * поверх `react-router-dom/NavLink`. Завдяки цьому підтримується активний стан
 * (`isActive`) для поточної сторінки та можливість передавати додаткові CSS-класи.
 *
 * @component
 * @example
 * // Приклад використання:
 * const navLinks = [
 *   { to: '/', label: 'Головна' },
 *   { to: '/stories', label: 'Історії' },
 *   { to: '/travelers', label: 'Мандрівники' },
 * ];
 *
 * return (
 *   <Navigation
 *     navLinks={navLinks}
 *     linkClassName="custom-link"
 *     activeClassName="custom-active"
 *   />
 * );
 *
 * @param {Object[]} navLinks Масив об’єктів із даними для пунктів меню.
 * @param {string} navLinks[].to Шлях (роут), куди веде посилання.
 * @param {string} navLinks[].label Текст, який відображається у меню.
 * @param {string} [linkClassName] Додатковий CSS-клас для базових посилань.
 * @param {string} [activeClassName] Додатковий CSS-клас для активного пункту меню (поточна сторінка).
 *
 * @returns {JSX.Element} Семантичний блок `<nav>` зі списком `<ul>` навігаційних пунктів.
 */

const Navigation = ({ navLinks, linkClassName, activeClassName }) => {
  return (
    <nav role="navigation" className={styles.nav}>
      <ul role="navigation" className={styles.navList}>
        {navLinks.map(({ to, label }) => (
          <li className={styles.navItem} key={to}>
            <AppNavLink
              to={to}
              label={label}
              className={linkClassName}
              activeClassName={activeClassName}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navigation;
