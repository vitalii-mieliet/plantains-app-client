/**
 * Компонент Section — обгортка для секцій сторінки з базовими вертикальними падінгами.
 *
 * За замовчуванням застосовує padding: 64px 0 (72px на екранах ≥1440px),
 * але дозволяє повністю перевизначити стилі через className.
 *
 * @param {object} props - Властивості компонента
 * @param {React.ReactNode} props.children - Вміст секції
 * @param {string} [props.className] - Додаткові CSS класи
 *
 */

import css from './Section.module.css';
import clsx from 'clsx';

const Section = ({ children, className, ...props }) => {
  const sectionClass = clsx(css.section, className);

  return (
    <section className={sectionClass} {...props}>
      {children}
    </section>
  );
};

export default Section;
