import { useEffect, useRef } from 'react';
import css from './InfoModal.module.css';
import clsx from 'clsx';
import FocusTrap from 'focus-trap-react';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import AppButton from '../../ui/AppButton/AppButton.jsx';

const InfoModal = ({
  title,
  text,
  confirmButtonText = 'Вийти',
  cancelButtonText = 'Відмінити',
  onConfirm,
  onCancel,
  className,
  ...props
}) => {
  // закрити по еск
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onCancel?.();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  // закрити по бекдропу
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel?.();
    }
  };

  const cancelBtnRef = useRef(null);

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <FocusTrap
        focusTrapOptions={{
          initialFocus: cancelBtnRef,
        }}
      >
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
            onClick={onCancel}
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
      </FocusTrap>
    </div>
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
