import { Navigate, Route, Routes } from 'react-router-dom';

import SharedLayout from './components/Layouts/SharedLayout';
import PublicLayout from './components/Layouts/PublicLayout';
import PrivateLayout from './components/Layouts/PrivateLayout';
import HomePage from './pages/HomePage/HomePage';
import {
  AddStory,
  PersonalPage,
  ProfilePage,
  AuthPage,
  StoriesPage,
  StoryPage,
  TravellerPage,
  TravellersPage,
  GoogleOAuthPage,
  NotFoundPage,
  OnboardingPage,
} from './routes/lazyPages';
import RestrictedRoute from './routes/RestrictedRoute';
import PrivateRoute from './routes/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from './redux/auth/operations';
import SavedStories from './pages/ProfilePage/SavedStories';
import CreatedStories from './pages/ProfilePage/CreatedStories';

import { selectAuthState } from './redux/auth/selectors';
import SplashScreen from './components/common/SplashScreen/SplashScreen';
// import Loader from './components/common/Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const { isRefreshing, isInitialized } = useSelector(selectAuthState);

  useEffect(() => {
    if (!isInitialized && !isRefreshing) {
      dispatch(refreshUser());
    }
  }, [dispatch, isInitialized, isRefreshing]);

  // if (!isInitialized && isRefreshing) return <Loader />;
  if (!isInitialized && isRefreshing) return <SplashScreen />; // заміна на сплешскрін замість лоадера
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="stories/:storyId" element={<StoryPage />} />
          <Route path="travellers" element={<TravellersPage />} />
          <Route path="travellers/:travellerId" element={<TravellerPage />} />
          <Route path="google-oauth" element={<GoogleOAuthPage />} />
        </Route>

        {/* Restricted route for auth */}
        <Route
          element={
            <RestrictedRoute>
              <PublicLayout />
            </RestrictedRoute>
          }
        >
          <Route
            path="auth"
            element={<Navigate to="/auth/register" replace />}
          />
          <Route path="auth/:authType" element={<AuthPage />} />
        </Route>

        {/* Private routes */}
        <Route
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="new-story" element={<AddStory />} />
          <Route path="edit" element={<PersonalPage />} />
          <Route path="profile" element={<ProfilePage />}>
            <Route index element={<Navigate to="saved-stories" replace />} />

            <Route path="saved-stories" element={<SavedStories />} />
            <Route path="created-stories" element={<CreatedStories />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
