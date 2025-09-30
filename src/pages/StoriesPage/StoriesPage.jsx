import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchStories } from '../../redux/stories/operations';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import AppMessage from '../../components/common/AppMessage/AppMessage';
import AppButton from '../../components/ui/AppButton/AppButton';
import styles from './StoriesPage.module.css';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import useBreakpoint from '../../hooks/useBreakpoint';
import { resetStories, setSearchParams } from '../../redux/stories/slice';
import clsx from 'clsx';
import AppSelect from '../../components/ui/formInputs/AppSelect/AppSelect';

const StoriesPage = () => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const [searchParamsUrl, setSearchParamsUrl] = useSearchParams();
  const [initialized, setInitialized] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('');

  const { items, hasNextPage, itemsStatus, error, isLoading, searchParams } =
    useSelector((state) => state.stories);

  const categoryMap = {
    'Всі історії': 'All Stories',
    Європа: 'Europe',
    Азія: 'Asia',
    Пустелі: 'Deserts',
    Африка: 'Africa',
    Україна: 'Ukraine',
    Америка: 'America',
  };
  const categories = [
    'Всі історії',
    'Європа',
    'Азія',
    'Пустелі',
    'Африка',
    'Україна',
    'Америка',
  ];

  const getTransliteratedCategory = (category) =>
    categoryMap[category] || category;

  const getOriginalCategory = (transliteratedCategory) =>
    Object.keys(categoryMap).find(
      (key) => categoryMap[key] === transliteratedCategory
    ) || transliteratedCategory;

  const { isMobile, isTablet } = useBreakpoint();
  const perPage = isTablet ? 8 : 9;

  const displayedItems = useMemo(() => {
    return items.slice(0, perPage * currentPage);
  }, [items, perPage, currentPage]);

  // work with search params
  useEffect(() => {
    const page = searchParamsUrl.get('page') || 1;
    const category = searchParamsUrl.get('category');
    const originalCategory = category
      ? getOriginalCategory(category)
      : categories[0];
    setCurrentCategory(originalCategory);
    const searchCategory =
      originalCategory === categories[0] ? null : originalCategory;

    dispatch(setSearchParams({ page, category: searchCategory }));
    setInitialized(true);
  }, [dispatch, searchParamsUrl]);

  // load stories
  useEffect(() => {
    const buttonPosition = buttonRef.current?.offsetTop || window.scrollY;
    if (initialized)
      dispatch(
        fetchStories({
          page: searchParams.page,
          perPage,
          category: searchParams.category,
        })
      )
        .unwrap()
        .then(() => {
          window.scrollTo({ top: buttonPosition, behavior: 'smooth' });
        });
  }, [
    dispatch,
    searchParams.page,
    searchParams.category,
    perPage,
    initialized,
  ]);

  // handlers
  const handleShowMore = async () => {
    if (!hasNextPage) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const newSearchParams = new URLSearchParams(searchParamsUrl);
    newSearchParams.set('page', nextPage);
    setSearchParamsUrl(newSearchParams);
  };

  //filters
  const handleCategoryChange = async (category) => {
    if (category === currentCategory) return;

    dispatch(resetStories());
    setCurrentPage(1);
    setCurrentCategory(category);

    const newSearchParams = new URLSearchParams();
    if (category !== categories[0]) {
      newSearchParams.set('category', getTransliteratedCategory(category));
    }
    setSearchParamsUrl(newSearchParams);
  };

  // JSX
  return (
    <Section className={styles.storiesSection}>
      <Container>
        <div className={styles.storiesContent}>
          <h1 className={styles.title}>Історії Мандрівників</h1>
          {isMobile ? (
            <div className={styles.mobileFilter}>
              <label className={styles.selectTitle}>Категорії</label>
              <AppSelect
                options={categories.map((cat) => ({
                  label: cat,
                  value: cat,
                }))}
                value={{ label: currentCategory, value: currentCategory }}
                placeholder="Виберіть категорію"
                onChange={(option) => handleCategoryChange(option.value)}
                className={styles.selectCategory}
                ariaLabel="Вибір категорії"
              />
            </div>
          ) : (
            <div className={styles.filterButtons}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={clsx(
                    styles.filterButton,
                    currentCategory === cat && styles.filterButtonActive
                  )}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <TravellersStories
            stories={displayedItems}
            isLoading={isLoading}
            perPage={perPage}
          />
        </div>

        {itemsStatus === 'failed' && (
          <AppMessage title="Виникла помилка" message={error} />
        )}

        <div className={styles.buttonWrapper}>
          {hasNextPage && (
            <AppButton
              ref={buttonRef}
              className={styles.showMoreBtn}
              onClick={handleShowMore}
              variant="blue"
              aria-label={isLoading ? 'Завантаження...' : 'Показати ще'}
            >
              Показати ще
            </AppButton>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default StoriesPage;
