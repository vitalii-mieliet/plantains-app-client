import useBreakpoint from './useBreakpoint';

/**
 * Кастомний хук для визначення кількості елементів на сторінці
 * (limit) залежно від типу пристрою.
 *
 * Використовує `useBreakpoint`, щоб перевірити поточний розмір екрана
 * і повернути відповідне значення пагінації.
 *
 * @param {Object} options - Налаштування кількості елементів для кожного пристрою
 * @param {number} options.mobile - Кількість елементів на мобільних пристроях
 * @param {number} options.tablet - Кількість елементів на планшетах
 * @param {number} options.desktop - Кількість елементів на десктопах
 *
 * @returns {number} limit - Поточна кількість елементів на сторінці
 *
 * @example
 * // У компоненті можна використати так:
 * const limit = useResponsivePagination({ mobile: 3, tablet: 4, desktop: 12 });
 *
 * useEffect(() => {
 *   dispatch(fetchStories({ page: 1, limit }));
 * }, [limit]);
 */
const useResponsivePagination = ({ mobile, tablet, desktop }) => {
  const { isTablet, isDesktop } = useBreakpoint();

  if (isTablet) return tablet;
  if (isDesktop) return desktop;
  return mobile; // дефолт — мобільний
};

export default useResponsivePagination;
