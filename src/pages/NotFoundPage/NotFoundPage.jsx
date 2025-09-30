import { useNavigate } from 'react-router-dom';
import AppButton from '../../components/ui/AppButton/AppButton.jsx';
import Container from '../../components/common/Container/Container.jsx';

import imgDesktop from '../../assets/images/notfound/img-404-desktop.webp'; //картинки для сторінки
import imgDesktop2x from '../../assets/images/notfound/img-404-desktop@2x.webp';
import imgTablet from '../../assets/images/notfound/img-404-tablet.webp';
import imgTablet2x from '../../assets/images/notfound/img-404-tablet@2x.webp';
import imgMobile from '../../assets/images/notfound/img-404-mobile.webp';
import imgMobile2x from '../../assets/images/notfound/img-404-mobile@2x.webp';

import useBreakpoint from '../../hooks/useBreakpoint.js';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.notFoundPage}>
      <Container>
        {/* кнопка навігаціі з AppButton */}
        <div className={styles.actions}>
          <AppButton
            onClick={handleGoHome}
            className={styles.homeButton}
            type="button"
            aria-label="Повернутися на головну"
            variant="blue"
            size={isMobile ? `sm` : `md`}
          >
            Назад на головну
          </AppButton>
        </div>
        <div className={styles.contentWrapper}>
          <div>
            <h1 className={styles.number} aria-label="Помилка 404">
              404
            </h1>
          </div>

          {/* повідомлення про не знайдену сторінку */}
          <div className={styles.errorMessage}>
            <h2 className={styles.errorMessageTitle}>
              На жаль, сторінка не знайдена :(
            </h2>
            <p className={styles.errorMessageDescription}>
              Поверніться на головну, щоб продовжити подорож
            </p>
          </div>

          {/* картінка 404 */}
          <div className={styles.imageContainer}>
            <picture>
              <source
                srcSet={`${imgDesktop} 1x, ${imgDesktop2x} 2x`}
                media="(min-width: 1440px)"
              />
              <source
                srcSet={`${imgTablet} 1x, ${imgTablet2x} 2x`}
                media="(min-width: 768px)"
              />
              <source
                srcSet={`${imgMobile} 1x, ${imgMobile2x} 2x`}
                media="(max-width: 767px)"
              />
              <img
                src={imgDesktop}
                alt="Сторінка не знайдена"
                className={styles.notFoundImage}
              />
            </picture>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
