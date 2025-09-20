import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import SharedLayout from './components/Layouts/SharedLayout';
import PublicLayout from './components/Layouts/PublicLayout';
import PrivateLayout from './components/Layouts/PrivateLayout';
import TravelerCard from './components/ui/TravelerCard/TravelerCard';

const AddStory = lazy(() => import('./pages/AddStory/AddStory'));
const PersonalPage = lazy(() => import('./pages/PersonalPage/PersonalPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage'));
const StoriesPage = lazy(() => import('./pages/StoriesPage/StoriesPage'));
const StoryPage = lazy(() => import('./pages/StoryPage/StoryPage'));
const TravellerPage = lazy(() => import('./pages/TravellerPage/TravellerPage'));
const TravellersPage = lazy(
  () => import('./pages/TravellersPage/TravellersPage')
);

const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="auth/:authType" element={<AuthPage />} />
            <Route path="stories" element={<StoriesPage />} />
            <Route path="stories/:storyId" element={<StoryPage />} />
            <Route path="travellers" element={<TravellersPage />} />
            <Route path="travellers/:travellerId" element={<TravellerPage />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateLayout />}>
            <Route path="new-story" element={<AddStory />} />
            <Route path="edit" element={<PersonalPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
