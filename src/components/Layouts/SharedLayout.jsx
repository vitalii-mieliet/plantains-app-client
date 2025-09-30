import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../common/Footer/Footer';
import Header from '../common/Header/Header';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  const location = useLocation();
  const hidenFooterRoutes = ['/auth/login', '/auth/register'];
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      {!hidenFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default SharedLayout;
