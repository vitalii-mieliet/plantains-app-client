import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectAuthIsLoading,
  selectIsLoggedIn,
} from '../../redux/auth/selectors';
import { loginWithGoogleCode } from '../../redux/auth/operations';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import css from './GoogleOAuthPage.module.css';

const GoogleOAuthPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectAuthIsLoading);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (!code) {
      navigate('/auth/login');
      return;
    }

    dispatch(loginWithGoogleCode(code));
  }, [dispatch, location.search, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <Section className={css.section}>
      <Container>
        <h2 className={css.title}>Авторизация через Google…</h2>
      </Container>
    </Section>
  );
};

export default GoogleOAuthPage;
