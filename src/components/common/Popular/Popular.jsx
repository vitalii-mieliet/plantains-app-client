import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPopularStories,
  selectPopularStoriesLoading,
} from '../../../redux/popularStories/selectors.js';
import useResponsivePagination from '../../../hooks/useResponsivePagination.js';
import useBreakpoint from '../../../hooks/useBreakpoint.js';
import { fetchPopularStories } from '../../../redux/popularStories/operations.js';
import Section from '../Section/Section.jsx';
import Container from '../Container/Container.jsx';
import TravellersStories from '../TravellersStories/TravellersStories.jsx';
import AppButton from '../../ui/AppButton/AppButton.jsx';
import styles from './Popular.module.css';
import { useNavigate } from 'react-router-dom';

const Popular = ({ showButton = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stories = useSelector(selectPopularStories) || [];
  const isLoading = useSelector(selectPopularStoriesLoading);

  // хук для пагінації
  const limit = useResponsivePagination({
    mobile: 3,
    tablet: 4,
    desktop: 3,
  });

  const { isMobile } = useBreakpoint();

  const [visibleCount, setVisibleCount] = useState(limit);

  useEffect(() => {
    setVisibleCount(limit);
  }, [limit]);

  // завантажуєм історії
  useEffect(() => {
    if (!stories.length) dispatch(fetchPopularStories());
  }, [dispatch, stories.length]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + limit);
  };

  const visibleStories = stories.slice(0, visibleCount);
  const showLoadMoreButton = stories.length > visibleCount;

  return (
    <Section>
      <Container>
        <h2 className={styles.sectionTitle}>Популярні історії</h2>

        <TravellersStories
          stories={visibleStories}
          isLoading={isLoading}
          perPage={limit}
        />
        {showButton && showLoadMoreButton && (
          <div className={styles.actions}>
            <AppButton
              onClick={handleLoadMore}
              variant="blue"
              type="button"
              size={isMobile ? 'sm' : 'md'}
              aria-label="Показати більше історій"
            >
              Показати ще
            </AppButton>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default Popular;
