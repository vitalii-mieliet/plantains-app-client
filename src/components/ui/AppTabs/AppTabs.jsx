import clsx from 'clsx';
import { Link } from 'react-router-dom';
import css from './AppTabs.module.css';

/**
 * Універсальний компонент вкладок (tabs), який може рендеритися у вигляді кнопок
 * (`<button>`) або посилань (`<Link>` з `react-router-dom`).
 *
 * Використовується для перемикання між різними станами або сторінками,
 * наприклад, фільтри чи вкладки профілю.
 *
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {{ label: string, value: string, to?: string }[]} props.options - Масив опцій для відображення вкладок.
 * Кожна опція повинна мати текст (`label`), значення (`value`) і за потреби шлях (`to`).
 * @param {string} props.value - Поточне активне значення вкладки.
 * @param {function} [props.onChange] - Колбек, який викликається при зміні активної вкладки (для `type="button"`).
 * @param {'contained' | 'outlined'} [props.variant='contained'] - Візуальний стиль відображення вкладок.
 * @param {'button' | 'link'} [props.type='button'] - Тип вкладки: кнопка (`button`) або посилання (`link`).
 * @param {string} [props.className] - Додатковий CSS-клас для контейнера вкладок.
 * @returns {JSX.Element} Компонент групи вкладок.
 *
 * @example
 * // Використання як кнопок (локальний state)
 * <AppTabs
 *   options={[
 *     { label: "Всі історії", value: "all" },
 *     { label: "Європа", value: "eu" }
 *   ]}
 *   value={filter}
 *   onChange={setFilter}
 *   variant="outlined"
 *   type="button"
 * />
 *
 * @example
 * // Використання як посилань (роутинг)
 * <AppTabs
 *   options={[
 *     { label: "Збережені історії", value: "saved", to: "saved-stories" },
 *     { label: "Мої історії", value: "created", to: "created-stories" }
 *   ]}
 *   value={activeTab}
 *   variant="contained"
 *   type="link"
 * />
 */

const AppTabs = ({
  options = [],
  value,
  onChange,
  variant = 'contained',
  type = 'button', // "button" | "link"
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(css.group, css[variant], className)}
      role="radiogroup"
      {...props}
    >
      {options.map((option) => {
        const isActive = value === option.value;
        const classes = clsx(css.base, css[variant], isActive && css.active);

        if (type === 'link') {
          return (
            <Link
              key={option.value}
              role="radio"
              aria-checked={isActive}
              className={classes}
              to={option.to || '#'}
              onClick={() => onChange?.(option.value)}
            >
              {option.label}
            </Link>
          );
        }

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={classes}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default AppTabs;
