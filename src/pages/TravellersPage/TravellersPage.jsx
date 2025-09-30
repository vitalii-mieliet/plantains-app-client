import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchTravellers } from '../../redux/travelers/operations';
import {
  selectTravellers,
  selectTravellersPage,
  selectTravellersTotalPages,
  selectTravellersLoading,
  selectTravellersError,
} from '../../redux/travelers/selectors';

import TravellerList from '../../components/common/TravellerList/TravellerList';
import AppButton from '../../components/ui/AppButton/AppButton';
import css from './TravellersPage.module.css';
import Section from '../../components/common/Section/Section';
import Container from '../../components/common/Container/Container';
import useBreakpoint from '../../hooks/useBreakpoint';

const TravellersPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const travelers = useSelector(selectTravellers);
  const page = useSelector(selectTravellersPage);
  const totalPages = useSelector(selectTravellersTotalPages);
  const isLoading = useSelector(selectTravellersLoading);
  const error = useSelector(selectTravellersError);

  const currentPage = Number(searchParams.get('page')) || 1;

  const { isDesktop } = useBreakpoint();
  const perPage = isDesktop ? 12 : 8;

  useEffect(() => {
    if (!travelers.length && page === 1)
      dispatch(fetchTravellers({ page: currentPage, perPage }));
  }, [dispatch, travelers.length, currentPage, perPage, page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setSearchParams({ page: nextPage });
      dispatch(fetchTravellers({ page: nextPage, perPage }));
    }
  };

  return (
    <Section>
      <Container>
        <h1 className={css.title}>Мандрівники</h1>

        {error && <p className={css.error}>Сталася помилка: {error}</p>}
        {!isLoading && !error && travelers.length === 0 && (
          <p className={css.empty}>Немає мандрівників</p>
        )}

        <TravellerList
          travelers={travelers}
          isLoading={isLoading}
          perPage={perPage}
        />

        <div className={css.btn}>
          {page < totalPages && (
            <AppButton fullWidth onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? 'Завантаження...' : 'Показати ще'}
            </AppButton>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default TravellersPage;
