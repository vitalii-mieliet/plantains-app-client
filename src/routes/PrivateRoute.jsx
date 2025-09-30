import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthState } from '../redux/auth/selectors';
import Loader from '../components/common/Loader/Loader';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isInitialized } = useSelector(selectAuthState);
  if (!isInitialized) return <Loader />;

  return isLoggedIn ? children : <Navigate to={'/auth/login'} replace />;
};

export default PrivateRoute;
