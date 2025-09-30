import styles from './Footer.module.css';
import Logo from '../Logo/Logo';
import Socials from '../Socials/Socials';
import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';

const Footer = () => {
  const navLinks = [
    { to: '/', label: 'Головна' },
    { to: '/stories', label: 'Історії' },
    { to: '/travellers', label: 'Мандрівники' },
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        {' '}
        <div className={styles.topSection}>
          <div className={styles.logoSocials}>
            <Logo link={'/'} />
            <div className={styles.socialList}>
              <Socials />
            </div>
          </div>
          <Navigation navLinks={navLinks} />
        </div>
        <div className={styles.copy}>
          <p>© 2025 Подорожники. Усі права захищені.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
