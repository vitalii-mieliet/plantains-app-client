import clsx from 'clsx';
import s from './AppButton.module.css';
import { Link } from 'react-router-dom';

/**
 * Універсальний компонент кнопки, який може рендеритись як:
 * - нативна кнопка `<button>`
 * - зовнішнє посилання `<a href="http...">`
 * - внутрішнє посилання `<Link to="/path">`
 * - посилання-якір `<a href="#id">`
 *
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {React.ReactNode} props.children - Вміст кнопки (текст, іконки тощо).
 * @param {'sm' | 'md'} [props.size='md'] - Розмір кнопки: маленька (`sm`) або стандартна (`md`).
 * @param {boolean} [props.fullWidth=false] - Якщо true, кнопка займає 100% ширини контейнера.
 * @param {boolean} [props.disabled=false] - Вимикає кнопку (працює як для `<button>`, так і для `<a>`).
 * @param {'blue' | 'grey'} [props.variant='blue'] - Візуальний стиль кнопки.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Тип кнопки (застосовується лише якщо рендериться `<button>`).
 * @param {string} [props.href] - Якщо передано, компонент рендериться як посилання (`<a>` або `<Link>`).
 * @param {string} [props.className] - Додатковий CSS-клас для стилізації.
 * @param {function(MouseEvent):void} [props.onClick] - Обробник кліку. Викликається як для `<button>`, так і для `<a>/<Link>`, крім випадку `disabled`.
 * @returns {JSX.Element} Відрендерений елемент кнопки або посилання.
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
 * // Кнопка на всю ширину (наприклад, у мобільному меню)
 * <AppButton fullWidth variant="blue">Реєстрація</AppButton>
 *
 * @example
 * // Кнопка як посилання
 * <AppButton href="/auth/login" variant="grey">Увійти</AppButton>
 *
 * @example
 * // Кнопка з обробником кліку
 * <AppButton onClick={() => alert('Клік!')}>Натисни</AppButton>
 */

const AppButton = ({
  children,
  size = 'md',
  fullWidth = false,
  disabled = false,
  variant = 'blue',
  type = 'button',
  href,
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

  if (href && (href.startsWith('http') || href.startsWith('#'))) {
    const isExternal = /^https?:\/\//.test(href);

    return (
      <a
        href={disabled ? undefined : href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-disabled={disabled}
        role={disabled ? 'button' : undefined}
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

  if (href) {
    return (
      <Link
        to={href}
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
