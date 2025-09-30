import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoryById } from '../../redux/stories/operations';
import { resetCurrentStory } from '../../redux/stories/slice';
import StoryDetails from '../../components/StoryDetails/StoryDetails';
import Container from '../../components/common/Container/Container';
import Loader from '../../components/common/Loader/Loader';
import AppMessage from '../../components/common/AppMessage/AppMessage';
import styles from './StoryPage.module.css';
import Popular from '../../components/common/Popular/Popular.jsx';

const StoryPage = () => {
  const { storyId } = useParams();
  const dispatch = useDispatch();

  const { currentStory, currentStoryStatus, error } = useSelector(
    (state) => state.stories
  );

  useEffect(() => {
    if (storyId) {
      dispatch(fetchStoryById(storyId));
    }
    return () => {
      dispatch(resetCurrentStory());
    };
  }, [dispatch, storyId]);

  const isLoading = currentStoryStatus === 'loading';

  return (
    <div className={styles.pageWrapper}>
      <Container aria-busy={isLoading}>
        {isLoading && <Loader />}
        {currentStoryStatus === 'failed' && (
          <AppMessage
            title="Виникла помилка"
            message={error}
            buttonText="Повернутись до всіх історій"
            route="/stories"
          />
        )}
        {currentStory && !isLoading && (
          <StoryDetails storyData={currentStory} />
        )}
        {!currentStory && currentStoryStatus === 'succeeded' && (
          <AppMessage
            title="Історія не знайдена"
            message="На жаль, ми не змогли знайти таку історію."
            buttonText="Повернутись до всіх історій"
            route="/stories"
          />
        )}
      </Container>
      {/* компонент попьюлар вже огорнутий в контейнер */}
      <Popular showButton={false} />
    </div>
  );
};

export default StoryPage;
