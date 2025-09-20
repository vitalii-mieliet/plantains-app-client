import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import Logo from '../Logo/logo.svg?react';
import BurgerMenu from '../../../assets/icons/menu.svg?react';
import BurgerClose from '../../../assets/icons/close.svg?react';

import Container from '../Container/Container';
import s from './Header.module.css';
import AppButton from '../../ui/AppButton/AppButton';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // handler
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  //
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    checkIfMobile(); // Listen to when start
    window.addEventListener('resize', checkIfMobile); //Listen to changes in size
  }, []);

  // JSX
  return (
    <Container>
      <header className={s.header}>
        <NavLink to="/">
          <Logo
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
        {!isMobile && (
          <nav className={clsx(s.nav, !isHome && s.outHome)}>
            <ul>
              <li>
                <Link to="/">Головна</Link>
              </li>
              <li>
                <Link to="/stories">Історії</Link>
              </li>
              <li>
                <Link to="/travellers">Мандрівники</Link>
              </li>
              <li>
                <AppButton
                  href="/auth/login"
                  variant={isHome ? 'init' : 'grey'}
                  width="58px"
                  height="35px"
                >
                  Вхід
                </AppButton>
              </li>
              <li>
                <AppButton
                  href="/auth/register"
                  variant={isHome ? 'dark' : 'blue'}
                  width="113px"
                  height="35px"
                >
                  Реєстрація
                </AppButton>
              </li>
            </ul>
          </nav>
        )}

        {isMobile && (
          <AppButton variant={isHome ? 'init' : 'grey'} onClick={toggleMenu}>
            {isMenuOpen ? <BurgerClose /> : <BurgerMenu />}
          </AppButton>
        )}
      </header>

      {/* Mobile */}
      {isMobile && isMenuOpen && (
        <div className={clsx(s.overlay, isMenuOpen && s.isOpen)}>
          <nav className={s.nav}>
            <ul>
              <li>
                <Link to="/" onClick={toggleMenu}>
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/stories" onClick={toggleMenu}>
                  Історії
                </Link>
              </li>
              <li>
                <Link to="/travellers" onClick={toggleMenu}>
                  Мандрівники
                </Link>
              </li>
              <li>
                <AppButton
                  href="/auth/login"
                  variant="grey"
                  width="355px"
                  height="35px"
                >
                  Вхід
                </AppButton>
              </li>
              <li>
                <AppButton
                  href="/auth/register"
                  variant="blue"
                  width="355px"
                  height="35px"
                >
                  Реєстрація
                </AppButton>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </Container>
  );
};

export default Header;
