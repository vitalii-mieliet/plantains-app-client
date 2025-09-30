import { useField } from 'formik';
import clsx from 'clsx';
import styles from './AppTextInput.module.css';

/**
 * Компонент текстового поля (`<input>`) з інтеграцією з Formik.
 *
 * Автоматично підключається до:
 * - `value`, `onChange`, `onBlur`
 * - Валідації (через `meta.error` та `meta.touched`)
 *
 * @component
 *
 * @param {Object} props - Властивості компонента.
 * @param {string} props.name - Назва поля для Formik (обов'язкове).
 * @param {string} [props.label] - Текст для `<label>` (необов'язковий).
 * @param {string} [props.placeholder] - Плейсхолдер для `<input>`.
 * @param {string} [props.className] - Додаткові класи для `<input>`.
 * @param {string} [props.wrapperClassName] - Додаткові класи для обгортки (`div`).
 * @param {string} [props.errorClassName] - Додаткові класи для повідомлення про помилку (`<span>`).
 * @param {Object} [props.props] - Інші валідні атрибути для `<input>`.
 *
 * @example
 * <Formik
 *   initialValues={{ title: '' }}
 *   onSubmit={(values) => console.log(values)}
 * >
 *   <Form>
 *     <AppTextInput
 *       name="title"
 *       label="Заголовок"
 *       placeholder="Введіть заголовок історії"
 *     />
 *   </Form>
 * </Formik>
 */
const AppTextInput = ({
  label,
  className,
  wrapperClassName,
  errorClassName,
  ...props
}) => {
  const [field, meta] = useField(props);

  const inputClasses = clsx(
    styles.input,
    { [styles.inputError]: meta.touched && meta.error },
    className
  );

  const wrapperClasses = clsx(styles.inputWrapper, wrapperClassName);
  const errorMessageClasses = clsx(styles.errorMessage, errorClassName);

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={props.id || props.name} className={styles.label}>
          {label}
        </label>
      )}

      <input
        className={inputClasses}
        {...field} // value, onChange, onBlur
        {...props} // placeholder, type, aria-label, id
      />

      {meta.touched && meta.error && (
        <span className={errorMessageClasses}>{meta.error}</span>
      )}
    </div>
  );
};

export default AppTextInput;
