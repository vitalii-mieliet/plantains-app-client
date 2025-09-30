import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthState } from '../redux/auth/selectors';
import Loader from '../components/common/Loader/Loader';

const RestrictedRoute = ({ children }) => {
  const { isLoggedIn, isInitialized } = useSelector(selectAuthState);
  if (!isInitialized) return <Loader />;
  return isLoggedIn ? <Navigate to={'/'} replace /> : children;
};

export default RestrictedRoute;
