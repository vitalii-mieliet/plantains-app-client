import React from 'react';
import AppButton from '../ui/AppButton/AppButton';
import s from './AuthButtons.module.css';

function AuthButtons({ isHome, isMenuOpen }) {
  return (
    <>
      <div className={s.buttonWrap}>
        <AppButton
          href="/auth/login"
          variant={(isMenuOpen || !isHome) && 'grey'}
          className={isHome && !isMenuOpen && s.init}
          size="sm"
          aria-label="Увійти в акаунт"
        >
          Вхід
        </AppButton>

        <AppButton
          href="/auth/register"
          variant={(isMenuOpen || !isHome) && 'blue'}
          className={isHome && !isMenuOpen && s.white}
          aria-label="Створити акаунт"
        >
          Реєстрація
        </AppButton>
      </div>
    </>
  );
}

export default AuthButtons;
