import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import BurgerMenu from '../../../assets/icons/menu.svg?react';
import BurgerClose from '../../../assets/icons/close.svg?react';
import Logo from '../Header/Logo.svg?react';

import Container from '../Container/Container';
import s from './Header.module.css';
import AppButton from '../../ui/AppButton/AppButton';
import Navigation from '../Navigation/Navigation';
import AuthButtons from '../../AuthButtons/AuthButtons';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import UserBar from '../../ui/UserBar/UserBar';
import useBreakpoint from '../../../hooks/useBreakpoint';
import { selectUserProfile } from '../../../redux/user/selectors';

const Header = () => {
  //data from Redux
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUserProfile);

  const navLinks = [
    { to: '/', label: 'Головна' },
    { to: '/stories', label: 'Історії' },
    { to: '/travellers', label: 'Мандрівники' },
  ];

  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayRef = useRef();

  //  no allowed path
  const noAllowed = ['/auth/login', '/auth/register', '/edit'];

  // handler
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if ((isMobile || isTablet) && isMenuOpen && overlayRef.current) {
      const timeOutId = setTimeout(() => {
        const firstLink = overlayRef.current.querySelector('a, button');
        if (firstLink) {
          firstLink.focus();
        }
      }, 0);
      return () => clearTimeout(timeOutId);
    }
  }, [isMobile, isMenuOpen, isTablet]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // if authorizided
  const extendedNavLinks =
    isLoggedIn && user
      ? [...navLinks, { to: '/profile', label: 'Мій Профіль' }]
      : navLinks;

  // JSX
  return (
    <>
      <header className={s.headerContainer}>
        <Container>
          <div className={s.header}>
            <NavLink to="/">
              <Logo
                aria-label="Логотип"
                className={s.logo}
                style={{
                  fill:
                    isHome && !isMenuOpen
                      ? 'var(--color-white)'
                      : 'var(--color-scheme-1-text)',
                }}
              />
            </NavLink>

            {/* Desktop */}
            <>
              {isDesktop && !noAllowed.includes(location.pathname) && (
                <div className={s.linksWrap}>
                  {isLoggedIn ? (
                    <>
                      <Navigation
                        linkClassName={isHome && s.white}
                        navLinks={extendedNavLinks}
                      />
                      <div className={s.descktopWrapBtn}>
                        <AppButton className={s.publish} href="/new-story">
                          Опублікувати&#160;історію
                        </AppButton>
                        <UserBar isLoggedIn={isLoggedIn} user={user} />
                      </div>
                    </>
                  ) : (
                    <>
                      <Navigation
                        linkClassName={isHome && s.white}
                        navLinks={extendedNavLinks}
                      />
                      <AuthButtons isHome={isHome} />
                    </>
                  )}
                </div>
              )}
            </>

            {(isMobile || isTablet) &&
              !noAllowed.includes(location.pathname) && (
                <div className={s.tabletWrapButn}>
                  {isLoggedIn && !isMobile && (
                    <AppButton className={s.publish} href="/new-story">
                      Опублікувати&#160;історію
                    </AppButton>
                  )}
                  <AppButton
                    className={isHome ? s.init : s.menuButton}
                    variant="grey"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-nav"
                    aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
                  >
                    {isMenuOpen ? (
                      <BurgerClose />
                    ) : (
                      <BurgerMenu
                        className={isHome ? s.menuWhite : s.menuBlack}
                      />
                    )}
                  </AppButton>
                </div>
              )}
          </div>
        </Container>
      </header>

      {/* Mobile */}
      {isMenuOpen && !isDesktop && (
        <div
          className={clsx(s.overlay, isMenuOpen && s.isOpen)}
          id="mobile-nav"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
        >
          <Container>
            <div className={s.mobileMenu}>
              {isLoggedIn ? (
                <>
                  <Navigation navLinks={extendedNavLinks} />
                  {isMobile && (
                    <AppButton className={s.publish} href="/new-story">
                      Опублікувати&#160;історію
                    </AppButton>
                  )}
                  <UserBar isLoggedIn={isLoggedIn} user={user} />
                </>
              ) : (
                <>
                  <Navigation navLinks={extendedNavLinks} />
                  <AuthButtons isHome={isHome} isMenuOpen={isMenuOpen} />
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Header;
