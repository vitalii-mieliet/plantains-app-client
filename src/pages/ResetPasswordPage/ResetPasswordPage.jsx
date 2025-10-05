import { useParams } from 'react-router-dom';
import SendResetEmailForm from '../../components/SendResetEmailForm/SendResetEmailForm';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import css from './ResetPasswordPage.module.css';

const ResetPasswordPage = () => {
  const { resetType } = useParams();

  if (resetType !== 'sent-reset-email' && resetType !== 'reset-password') {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <Section className={css.section}>
      <Container className={css.container}>
        {resetType === 'sent-reset-email' ? (
          <SendResetEmailForm />
        ) : (
          <ResetPasswordForm />
        )}
      </Container>
    </Section>
  );
};

export default ResetPasswordPage;
