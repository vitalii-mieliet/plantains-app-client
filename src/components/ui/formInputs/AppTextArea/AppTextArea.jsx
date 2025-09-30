import { useField } from 'formik';
import clsx from 'clsx';
import styles from './AppTextArea.module.css';

/**
 * Компонент текстової області (`<textarea>`) з інтеграцією з Formik.
 *
 * Автоматично працює з валідацією Formik:
 * - Показує помилку, якщо поле було відвідане (`touched`) та є помилка (`error`).
 * - Додає стилі для помилок.
 *
 * @component
 *
 * @param {Object} props - Властивості компонента.
 * @param {string} props.name - Ім'я поля для Formik (обов'язкове).
 * @param {string} [props.label] - Текст для `<label>` (необов'язковий).
 * @param {string} [props.placeholder] - Плейсхолдер для `<textarea>`.
 * @param {string} [props.className] - Додаткові класи для обгортки (`div`).
 * @param {string} [props.inputClassName] - Додаткові класи для `<textarea>`.
 * @param {string} [props.errorClassName] - Додаткові класи для повідомлення про помилку (`<span>`).
 * @param {Object} [props.props] - Інші валідні атрибути для `<textarea>`.
 *
 * @example
 * <Formik
 *   initialValues={{ description: '' }}
 *   onSubmit={(values) => console.log(values)}
 * >
 *   <Form>
 *     <AppTextArea
 *       name="description"
 *       label="Опис"
 *       placeholder="Введіть опис історії"
 *     />
 *   </Form>
 * </Formik>
 */
const AppTextArea = ({
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) => {
  const [field, meta] = useField(props);

  const wrapperClasses = clsx(styles.textareaWrapper, className);

  const textareaClasses = clsx(
    styles.textarea,
    { [styles.textareaError]: meta.touched && meta.error },
    inputClassName
  );

  const errorMessageClasses = clsx(styles.errorMessage, errorClassName);

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={props.id || props.name} className={styles.label}>
          {label}
        </label>
      )}

      <textarea
        className={textareaClasses}
        {...field} // підключає value, onChange, onBlur
        {...props} // інші пропси, як placeholder, id, aria-label
      />

      {meta.touched && meta.error && (
        <span className={errorMessageClasses}>{meta.error}</span>
      )}
    </div>
  );
};

export default AppTextArea;
