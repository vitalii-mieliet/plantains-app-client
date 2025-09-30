import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TravellerInfo from '../../components/common/TravellerInfo/TravellerInfo';
import AppTabs from '../../components/ui/AppTabs/AppTabs';
import Section from '../../components/common/Section/Section';
import Container from '../../components/common/Container/Container';
import { fetchCurrentUser } from '../../redux/user/operations';
import { selectUserProfile, selectUserError } from '../../redux/user/selectors';
import css from './ProfilePage.module.css';
import AppButton from '../../components/ui/AppButton/AppButton';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const error = useSelector(selectUserError);

  const location = useLocation();
  const activeTab = location.pathname.includes('created-stories')
    ? 'created'
    : 'saved';

  const tabsOptions = [
    {
      label: 'Збережені історії',
      value: 'saved',
      to: 'saved-stories',
    },
    {
      label: 'Мої історії',
      value: 'created',
      to: 'created-stories',
    },
  ];

  useEffect(() => {
    if (!user) dispatch(fetchCurrentUser());
  }, [dispatch, user]);

  if (error) return <AppMessage title={'Виникла помилка'} message={error} />;

  return (
    <Section>
      <Container>
        <TravellerInfo user={user} className={css.travellerInfo} />

        <div className={css.boxTab}>
          <AppTabs
            type="link"
            options={tabsOptions}
            value={activeTab}
            variant="contained"
            className={css.tabs}
          />
          <AppButton href="/onboarding" className={css.editButton}>
            Редагувати профіль
          </AppButton>
        </div>
        <Outlet />
      </Container>
    </Section>
  );
};

export default ProfilePage;
