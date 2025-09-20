import clsx from 'clsx';
import s from './AppButton.module.css';

/**
 * Універсальна кнопка, яка може бути:
 * - Звичайною кнопкою (<button>)
 * - Посиланням (<a>) — якщо передано `href`
 *
 * Автоматично застосовує загальні стилі та варіант оформлення.
 *
 * @param {React.ReactNode} children      — Вміст кнопки (текст, іконка тощо)
 * @param {number|string} [width]         — Ширина кнопки (наприклад, 100 або '100%')
 * @param {number|string} [height]        — Висота кнопки
 * @param {boolean} [disabled=false]      — Якщо true — кнопка неактивна
 * @param {'blue'|'grey'|'dark'|'black'} [variant='blue'] — Стильовий варіант кнопки
 * @param {'button'|'submit'|'reset'} [type='button'] — Тип кнопки (тільки для <button>)
 * @param {string} [href]                 — URL. Якщо вказано — рендериться як <a>
 * @param {object} rest                   — Будь-які інші пропси (onClick, id, className, target, rel тощо)
 *
 * @example
 * <AppButton onClick={() => alert('click')}>Кнопка</AppButton>
 *
 * @example
 * <AppButton href="/profile" variant="grey">Профіль</AppButton>
 *
 * @example
 * <AppButton width={120} height={40} disabled>Завантаження...</AppButton>
 */

const AppButton = ({
  children,
  width,
  height,
  disabled,
  variant = 'blue',
  type = 'button',
  href,
  className,
  onClick,
  ...rest
}) => {
  const commonProps = {
    className: clsx(s.base, s[variant], className && className),
    onClick: { onClick },
    style: { width, height },
    ...rest,
  };

  if (href && !disabled) {
    return (
      <a href={href} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} {...commonProps}>
      {children}
    </button>
  );
};

export default AppButton;
