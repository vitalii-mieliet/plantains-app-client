import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '../../redux/stories/operations';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import Loader from '../../components/common/Loader/Loader';
import AppMessage from '../../components/common/AppMessage/AppMessage';
import AppButton from '../../components/ui/AppButton/AppButton';
import styles from './StoriesPage.module.css';  
import { useStoriesPerPage } from '../../hooks/useStoriesPerPage';


const CATEGORIES = ["Всі історії", "Європа", "Азія", "Пустелі", "Африка"];

const StoriesPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const storiesPerPage = useStoriesPerPage();

  const {
    items: stories,
    itemsStatus,
    error,
    hasNextPage,
    isLoadingMore,
  } = useSelector((state) => state.stories);

  useEffect(() => {
    if (itemsStatus === 'idle') {
      dispatch(fetchStories({ page: 1, perPage: storiesPerPage }));
    }
  }, [dispatch, itemsStatus, storiesPerPage]); 

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchStories({ page: nextPage, perPage: storiesPerPage }));
  };

  const isLoading = itemsStatus === 'loading';

  return (
    <Section aria-busy={isLoading}>
      <Container>
        
        <header className={styles.header}>
          <h1 className={styles.title}>Історії Мандрівників</h1>

          <div className={styles.filters}>
            
             
            <label htmlFor="categorySelect" className={styles.filterSelectHeading}>
        Категорії
      </label>
            <select
              className={styles.filterSelect}
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <option disabled>Категорії</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

           
            <div className={styles.filterButtons}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={styles.filterButton}
                  onClick={() => setActiveCategory(cat)}
                 
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {isLoading && <Loader />}
        
        {itemsStatus === 'failed' && (
          <AppMessage
            title="Виникла помилка"
            message={error}
            buttonText="Спробувати знову"
            route="/stories"
          />
        )}
         
        {itemsStatus === 'succeeded' && <TravellersStories stories={stories} />}

        <div className={styles.buttonWrapper}>
          {hasNextPage && !isLoadingMore && (
            <AppButton onClick={handleLoadMore} variant="blue">
              Показати ще
            </AppButton>
          )}
          {isLoadingMore && <Loader />}
        </div>
      </Container>
    </Section>
  );
};

export default StoriesPage;