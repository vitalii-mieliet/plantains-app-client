import { lazy } from 'react';
import withSuspense from '../hocs/withSuspense';

export const AddStory = withSuspense(
  lazy(() => import('../pages/AddStory/AddStory'))
);
export const PersonalPage = withSuspense(
  lazy(() => import('../pages/PersonalPage/PersonalPage'))
);
export const ProfilePage = withSuspense(
  lazy(() => import('../pages/ProfilePage/ProfilePage'))
);
export const AuthPage = withSuspense(
  lazy(() => import('../pages/AuthPage/AuthPage'))
);
export const StoriesPage = withSuspense(
  lazy(() => import('../pages/StoriesPage/StoriesPage'))
);
export const StoryPage = withSuspense(
  lazy(() => import('../pages/StoryPage/StoryPage'))
);
export const TravellerPage = withSuspense(
  lazy(() => import('../pages/TravellerPage/TravellerPage'))
);
export const TravellersPage = withSuspense(
  lazy(() => import('../pages/TravellersPage/TravellersPage'))
);
export const GoogleOAuthPage = withSuspense(
  lazy(() => import('../pages/GoogleOAuthPage/GoogleOAuthPage'))
);
export const NotFoundPage = withSuspense(
  lazy(() => import('../pages/NotFoundPage/NotFoundPage'))
);
export const ResetPasswordPage = withSuspense(
  lazy(() => import('../pages/ResetPasswordPage/ResetPasswordPage'))
);
export const OnboardingPage = withSuspense(
  lazy(() => import('../pages/OnboardingPage/OnboardingPage'))
);
