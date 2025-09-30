import { toast } from 'react-toastify';

// свг
const SuccessIcon = (
  <svg
    className="toast-icon toast-success-icon"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M5 10l4 4L15 7" />
  </svg>
);

const ErrorIcon = (
  <svg
    className="toast-icon toast-error-icon"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <line x1="5" y1="5" x2="15" y2="15" />
    <line x1="15" y1="5" x2="5" y2="15" />
  </svg>
);

/**
 * Відображає тост із позитивним повідомленням (успішна дія).
 *
 * @function showSuccessToast
 * @param {string} message - Текст повідомлення для користувача.
 * @returns {React.ReactText} ID тосту, який може бути використаний для його подальшого керування.
 *
 * @example
 * showSuccessToast('Ваш профіль успішно оновлено');
 */
export const showSuccessToast = (message) =>
  toast.success(message, {
    icon: SuccessIcon,
    role: 'status', // ✔️ правильне значення
  });

/**
 * Відображає тост із негативним повідомленням (помилка).
 *
 * @function showErrorToast
 * @param {string} message - Текст повідомлення про помилку.
 * @returns {React.ReactText} ID тосту, який може бути використаний для його подальшого керування.
 *
 * @example
 * showErrorToast('Не вдалося зберегти дані. Спробуйте ще раз.');
 */
export const showErrorToast = (message) =>
  toast.error(message, {
    icon: ErrorIcon,
    role: 'alert', // ✔️ для помилок
  });
