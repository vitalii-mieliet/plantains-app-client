import React, { useState } from 'react';
import s from './UserBar.module.css';
import { useDispatch } from 'react-redux';

import Logout from '../../../assets/icons/logout.svg?react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../../../redux/auth/operations';
import clsx from 'clsx';
import InfoModal from '../../common/InfoModal/InfoModal';
import { showErrorToast } from '../../common/AppToastContainer/toastHelpers';

function UserBar({ isLoggedIn, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false); // Confirm modal state

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch {
      showErrorToast('Не вдалося вийти. Спробуйте ще раз.');
    }
  };

  // JSX
  return (
    <div
      className={clsx(s.userBar, location.pathname === '/' ? s.white : s.black)}
    >
      {isLoggedIn && (
        <>
          <div className={s.avatar}>
            {user?.avatar ? (
              <img src={user?.avatar} alt="аватар" />
            ) : (
              user?.name.charAt(0)
            )}
          </div>
          <span>{user?.name}</span>
          <button
            className={isHome ? s.logoutBtnHome : s.logoutBtnOut}
            aria-label="Вихід"
            onClick={() => setIsOpen(true)}
          >
            <Logout />
          </button>
          <InfoModal
            isOpen={isOpen}
            title="Ви точно хочете вийти?"
            text="Ми будемо сумувати за вами!"
            onCancel={() => setIsOpen(false)}
            onConfirm={handleLogout}
          />
        </>
      )}
    </div>
  );
}

export default UserBar;
