import styles from './OnboardingPage.module.css';
import OnboardingForm from '../../components/OnboardingForm/OnboardingForm';
import Section from '../../components/common/Section/Section';
import Container from '../../components/common/Container/Container';
import { useSelector } from 'react-redux';
import { selectIsUserLoading } from '../../redux/user/selectors';
import Loader from '../../components/common/Loader/Loader';

export default function OnboardingPage() {
  // onSuccess — колбек, який ПІЗНІШЕ можна підвʼязати до navigate('/profile') або dispatch(...)
  const handleSuccess = (data) => {
    console.log('Onboarding completed (stub):', data);
    // TODO: navigate('/profile') або оновити Redux — коли будете готові
  };
  const isLoading = useSelector(selectIsUserLoading);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        <div className={styles.box}>
          <h1 className={styles.title}>Давайте познайомимось ближче</h1>
          <OnboardingForm onSuccess={handleSuccess} />
        </div>
      </Container>
    </Section>
  );
}
