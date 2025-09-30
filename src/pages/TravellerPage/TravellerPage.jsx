import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTravellerInfoById } from '../../redux/travelers/operations.js';
import { fetchStoriesByAuthor } from '../../redux/authorStories/operation.js';
import { selectAuthorStories } from '../../redux/authorStories/selectors.js';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';
import useBreakpoint from '../../hooks/useBreakpoint.js';
import TravellerInfo from '../../components/common/TravellerInfo/TravellerInfo.jsx';
import Container from '../../components/common/Container/Container';
import AppButton from '../../components/ui/AppButton/AppButton.jsx';
import s from './TravellerPage.module.css';

const TravellerPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const { travellerId: id } = useParams();
  const page = searchParams.get('page') || 1;

  const travellerInfo = useSelector((state) => state.travelers.author || {});
  const { items, hasNextPage, isLoading } = useSelector(selectAuthorStories);
  const { isDesktop } = useBreakpoint();
  const perPage = isDesktop ? 6 : 4;

  const displayedItems = useMemo(() => {
    return items.slice(0, perPage * currentPage);
  }, [items, perPage, currentPage]);

  // load stories
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        await dispatch(fetchTravellerInfoById(id)).unwrap();
      } catch (error) {
        setError(error.message || 'Не вдалося завантажити дані користувача');
      }
    };
    loadUserInfo();

    dispatch(fetchStoriesByAuthor({ params: { page, perPage }, id }));
  }, [dispatch, id, page, perPage]);

  // handler
  const handleClick = async () => {
    if (!hasNextPage) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', nextPage);
    setSearchParams(newSearchParams);
  };

  //JSX
  return (
    <>
      <Container>
        <div className={s.travellerInfo}>
          {!error ? (
            <TravellerInfo user={travellerInfo} />
          ) : (
            <p className={s.error}>{error}</p>
          )}
        </div>

        <section className={s.historySection} aria-busy={isLoading}>
          <h2 className={s.title}>Історії Мандрівника</h2>

          {items.length === 0 && !isLoading ? (
            <div className={s.messageWrap}>
              <MessageNoStories
                buttonText="Назад до історій"
                text="Цей користувач ще не публікував історій"
              />
            </div>
          ) : (
            <TravellersStories
              stories={displayedItems}
              isLoading={isLoading}
              perPage={perPage}
            />
          )}

          {hasNextPage && (
            <div className={s.wrapBtn}>
              <AppButton
                onClick={handleClick}
                size="sm"
                className={s.showMoreBtn}
                aria-label="Показати ще"
              >
                Показати ще
              </AppButton>
            </div>
          )}
        </section>
      </Container>
    </>
  );
};

export default TravellerPage;
