import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCreatedStories,
  selectStoriesError,
  selectStoriesLoading,
  selectUserProfile,
} from '../../redux/user/selectors';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import { fetchCreatedStories } from '../../redux/user/operations';

import AppMessage from '../../components/common/AppMessage/AppMessage';

const CreatedStories = () => {
  const dispatch = useDispatch();
  const { data: stories, ...meta } = useSelector(selectCreatedStories);
  const isLoading = useSelector(selectStoriesLoading);
  const error = useSelector(selectStoriesError);
  const user = useSelector(selectUserProfile);

  const noStoriesText =
    'Ви ще нічого не публікували , поділіться своєю першою історією ';

  useEffect(() => {
    if (user?._id && !stories.length && meta.page === 1) {
      dispatch(fetchCreatedStories());
    }
  }, [dispatch, user?._id, stories.length, meta.page]);

  if (error) return <AppMessage title={'Виникла помилка'} message={error} />;
  // перший екран скелетів
  if (isLoading) {
    return (
      <TravellersStories
        stories={[]}
        isLoading={true}
        perPage={meta.perPage || 6}
      />
    );
  }
  if (meta.totalItems > 0) {
    return (
      <TravellersStories
        stories={stories}
        isLoading={isLoading}
        perPage={stories.length || 6}
      />
    );
  }

  return (
    <MessageNoStories
      text={noStoriesText}
      buttonText="Створити історію"
      route="/new-story"
    />
  );
};

export default CreatedStories;
