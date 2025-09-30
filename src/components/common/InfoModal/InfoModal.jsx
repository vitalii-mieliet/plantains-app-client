import { useEffect, useRef } from 'react';
import css from './InfoModal.module.css';
import clsx from 'clsx';

import CloseIcon from '../../../assets/icons/close.svg?react';
import AppButton from '../../ui/AppButton/AppButton.jsx';
import { FocusTrap } from 'focus-trap-react';

/**
 * Компонент модального вікна з інформаційним повідомленням та кнопками підтвердження/скасування.
 * Використовується для відображення діалогових повідомлень, які потребують дії користувача.
 *
 * Особливості:
 * - Рендериться лише коли `isOpen === true`.
 * - Закривається по кліку на бекдроп, натисканню клавіші `Escape`, кнопці скасування або іконці закриття.
 * - Використовує `focus-trap-react` для утримання фокусу всередині модального вікна.
 *
 * @component
 *
 * @param {Object} props - Властивості компонента.
 * @param {boolean} props.isOpen - Визначає, чи модалка відкрита.
 * @param {string} [props.title] - Заголовок модального вікна.
 * @param {string} [props.text] - Основний текст повідомлення.
 * @param {string} [props.confirmButtonText='Вийти'] - Текст кнопки підтвердження.
 * @param {string} [props.cancelButtonText='Відмінити'] - Текст кнопки скасування.
 * @param {() => void} [props.onConfirm] - Колбек, що викликається при натисканні кнопки підтвердження.
 * @param {() => void} [props.onCancel] - Колбек, що викликається при закритті модалки (бекдроп, Esc, кнопка скасування, іконка).
 * @param {string} [props.className] - Додаткові CSS-класи для контейнера модалки.
 * @param {Object} [props.props] - Будь-які інші пропси, що будуть прокинуті в контейнер.
 *
 * @example <caption>Просте використання</caption>
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <>
 *   <button onClick={() => setIsOpen(true)}>Відкрити</button>
 *   <InfoModal
 *     isOpen={isOpen}
 *     title="Ви точно хочете вийти?"
 *     text="Ми будемо сумувати за вами!"
 *     confirmButtonText="Вийти"
 *     cancelButtonText="Відмінити"
 *     onConfirm={() => setIsOpen(false)}
 *     onCancel={() => setIsOpen(false)}
 *   />
 * </>
 *
 * @example <caption>З кастомним текстом кнопок</caption>
 * <InfoModal
 *   isOpen={true}
 *   title="Видалити елемент?"
 *   text="Цю дію не можна буде скасувати."
 *   confirmButtonText="Так, видалити"
 *   cancelButtonText="Скасувати"
 *   onConfirm={handleDelete}
 *   onCancel={closeModal}
 * />
 */

const InfoModal = ({
  isOpen,
  title,
  text,
  confirmButtonText = 'Вийти',
  cancelButtonText = 'Відмінити',
  onConfirm,
  onCancel,
  onClose,
  className,
  ...props
}) => {
  const cancelBtnRef = useRef(null);
  // закрити по еск
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        (onClose ?? onCancel)?.();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel, isOpen, onClose]);

  // закрити по бекдропу
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      (onClose ?? onCancel)?.();
    }
  };

  if (!isOpen) return null;

  return (
    <FocusTrap
      focusTrapOptions={{
        initialFocus: () => cancelBtnRef.current,
      }}
    >
      <div className={css.backdrop} onClick={handleBackdropClick}>
        <div
          className={clsx(css.modal, className)}
          {...props}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-text"
        >
          <button
            className={css.close}
            onClick={onClose || onCancel}
            aria-label="Close modal"
            autoFocus
          >
            <CloseIcon />
          </button>

          {title && (
            <h2 className={css.title} id="modal-title">
              {title}
            </h2>
          )}
          {text && (
            <p className={css.text} id="modal-text">
              {text}
            </p>
          )}

          <div className={css.actions}>
            {cancelButtonText && (
              <AppButton
                variant="grey"
                onClick={onCancel}
                type="button"
                ref={cancelBtnRef}
                aria-label={cancelButtonText}
              >
                {cancelButtonText}
              </AppButton>
            )}
            {confirmButtonText && (
              <AppButton
                variant="blue"
                onClick={onConfirm}
                type="button"
                aria-label={confirmButtonText}
              >
                {confirmButtonText}
              </AppButton>
            )}
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};
export default InfoModal;
// ====================  Example ====================
//         <InfoModal
//           title="Ви точно хочете вийти?"
//           text="Ми будемо сумувати за вами!"
//           confirmButtonText="Вийти"
//           cancelButtonText="Відмінити"
//           onConfirm={() => setIsOpen(false)}
//           onCancel={() => setIsOpen(false)}
//         />
// =======================================================
