import { useState, useRef, useEffect } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import sprite from '../../../../assets/icons/sprite.svg';
import styles from './AppSelect.module.css';

/**
 * Кастомний селект з інтеграцією Formik.
 *
 * @component
 * @param {Object} props
 * @param {Array<{value: string, label: string}>} props.options - Масив опцій для селекту
 * @param {string} props.name - Ім'я поля для Formik (обов'язкове)
 * @param {string} [props.placeholder] - Плейсхолдер, який показується коли значення не вибране
 * @param {string} [props.className] - Додатковий клас для wrapper
 * @param {string} [props.ariaLabel] - Опис для скрінрідерів
 *
 * @example
 * <Formik
 *   initialValues={{ category: '' }}
 *   onSubmit={(values) => console.log(values)}
 * >
 *   <Form>
 *     <AppSelect
 *       name="category"
 *       placeholder="Оберіть категорію"
 *       options={[
 *         { value: 'books', label: 'Книги' },
 *         { value: 'movies', label: 'Фільми' },
 *       ]}
 *     />
 *     <button type="submit">Надіслати</button>
 *   </Form>
 * </Formik>
 */
const AppSelect = ({
  options,
  placeholder,
  className,
  ariaLabel,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef(null);

  // Визначаємо вибрану опцію по значенню
  const selectedOption =
    options.find((option) => option.value === field.value) || null;

  // Закриття при кліку поза селектом
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) handleSelect(options[highlightedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, options]);

  useEffect(() => {
    if (!isOpen) setHighlightedIndex(-1);
  }, [isOpen]);

  const toggleList = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) selectRef.current?.focus();
  };

  const handleSelect = (option) => {
    setIsOpen(false);
    helpers.setValue(option.value); // ✅ записуємо значення у Formik
    helpers.setTouched(true); // ✅ позначаємо поле як "touched"
  };

  const selectClasses = clsx(styles.select, {
    [styles.selectOpen]: isOpen,
    [styles.selectError]: meta.touched && meta.error,
  });

  return (
    <div
      className={clsx(styles.selectWrapper, className)}
      ref={selectRef}
      tabIndex={0}
      aria-label={ariaLabel}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
          helpers.setTouched(true); // позначаємо як "touched", щоб помилка показалася
        }
      }}
    >
      <div className={selectClasses} onClick={toggleList}>
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg className={styles.arrow} aria-hidden="true">
          <use href={`${sprite}#chevron_down`} />
        </svg>
      </div>

      {isOpen && (
        <ul className={styles.optionsList} role="listbox">
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={
                selectedOption && selectedOption.value === option.value
              }
              className={clsx(styles.option, {
                [styles.selectedOption]:
                  selectedOption && selectedOption.value === option.value,
                [styles.highlighted]: index === highlightedIndex,
              })}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {/* Помилка під селектом */}
      {meta.touched && meta.error && (
        <span className={styles.errorMessage}>{meta.error}</span>
      )}
    </div>
  );
};

export default AppSelect;
