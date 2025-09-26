import clsx from 'clsx';
import s from './AppButton.module.css';
import { Link } from 'react-router-dom';

/**
 * Універсальний компонент кнопки, який може рендеритись як:
 * - нативна кнопка `<button>`,
 * - внутрішнє посилання через React Router `<Link>`,
 * - або зовнішнє посилання `<a>`.
 *
 * Автоматично обирає правильний тип елемента залежно від переданих пропсів:
 * - якщо задано `to` → рендериться `<Link>` для внутрішньої SPA-навігації;
 * - якщо задано `href` → рендериться `<a>` для зовнішніх або внутрішніх (reload) посилань;
 * - інакше → рендериться `<button>`.
 *
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {React.ReactNode} props.children - Вміст кнопки (текст, іконки тощо).
 * @param {'sm' | 'md'} [props.size='md'] - Розмір кнопки: маленька (`sm`) або стандартна (`md`).
 * @param {boolean} [props.fullWidth=false] - Якщо true, кнопка займає 100% ширини контейнера.
 * @param {boolean} [props.disabled=false] - Вимикає кнопку або лінк (через `aria-disabled`).
 * @param {'blue' | 'grey'} [props.variant='blue'] - Візуальний стиль кнопки.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Тип кнопки (тільки для `<button>`).
 * @param {string} [props.href] - Якщо передано, рендериться `<a>` (переважно для зовнішніх посилань).
 * @param {string} [props.to] - Якщо передано, рендериться `<Link>` (внутрішня навігація без перезавантаження сторінки).
 * @param {string} [props.className] - Додатковий CSS-клас для стилізації.
 * @param {(e: MouseEvent) => void} [props.onClick] - Обробник кліку. Викликається для всіх режимів, крім випадку `disabled`.
 * @returns {JSX.Element} Відрендерений елемент кнопки, посилання або Link.
 *
 * @example
 * // Стандартна синя кнопка
 * <AppButton>Натисни мене</AppButton>
 *
 * @example
 * // Сіра маленька кнопка
 * <AppButton size="sm" variant="grey">Вхід</AppButton>
 *
 * @example
 * // Кнопка на всю ширину
 * <AppButton fullWidth variant="blue">Реєстрація</AppButton>
 *
 * @example
 * // Внутрішнє посилання (React Router Link)
 * <AppButton to="/new-story">Опублікувати історію</AppButton>
 *
 * @example
 * // Зовнішнє посилання
 * <AppButton href="https://google.com" variant="grey">Google</AppButton>
 *
 * @example
 * // Кнопка з обробником кліку
 * <AppButton onClick={() => alert('Клік!')}>Зберегти</AppButton>
 */

const AppButton = ({
  children,
  size = 'md',
  fullWidth = false,
  disabled = false,
  variant = 'blue',
  type = 'button',
  href,
  to,
  className,
  onClick,
  ...props
}) => {
  const commonProps = {
    className: clsx(
      s.button,
      s[variant],
      s[`button--${size}`],
      fullWidth && s.fullWidth,
      className
    ),
    ...props,
  };

  if (href && /^https?:\/\//.test(href)) {
    commonProps.rel = 'noopener noreferrer';
  }

  //hre
  if (href) {
    return (
      <a
        role={disabled ? 'button' : undefined}
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...commonProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      {...commonProps}
    >
      {children}
    </button>
  );
};

export default AppButton;
