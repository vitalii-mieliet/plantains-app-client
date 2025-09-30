import { useParams, Navigate } from 'react-router-dom';
import AppNavLink from '../../components/ui/AppNavLink/AppNavLink.jsx';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.jsx';
import OAuthComponents from '../../components/OAuthComponents/OAuthComponents.jsx';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import Section from '../../components/common/Section/Section.jsx';
import Container from '../../components/common/Container/Container.jsx';
import css from './AuthPage.module.css';

const AuthPage = () => {
  const { authType } = useParams();

  if (authType !== 'login' && authType !== 'register') {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Section className={(css.wrapper, css.authBgc)}>
      <Container className={css.Container}>
        <div className={css.content}>
          <ul className={css.nav}>
            <li>
              <AppNavLink
                to="/auth/register"
                label="Реєстрація"
                className={css.tab}
                activeClassName={css.active}
              />
            </li>
            <li>
              <AppNavLink
                to="/auth/login"
                label="Вхід"
                className={css.tab}
                activeClassName={css.active}
              />
            </li>
          </ul>
          {authType === 'register' ? <RegistrationForm /> : <LoginForm />}
          <OAuthComponents />
        </div>
        <div className={css.copy}>
          <p>© 2025 Подорожники. Усі права захищені.</p>
        </div>
      </Container>
    </Section>
  );
};

export default AuthPage;
