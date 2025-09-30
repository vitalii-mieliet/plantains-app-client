import Container from '../common/Container/Container';
import Section from '../common/Section/Section';
import AppButton from '../ui/AppButton/AppButton';
import useBreakpoint from '../../hooks/useBreakpoint';
import css from './Hero.module.css';

const Hero = () => {
  const { isMobile } = useBreakpoint();
  return (
    <Section className={css.hero}>
      <Container>
        <h1 className={css.heroTitle}>Відкрийте світ подорожей з нами!</h1>
        <p className={css.heroDescription}>
          Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
          своїми історіями та отримувати натхнення для нових пригод. Відкрийте
          для себе нові місця та знайдіть однодумців!
        </p>

        <AppButton href="#join-section" variant="blue" fullWidth={isMobile}>
          Доєднатись
        </AppButton>
      </Container>
    </Section>
  );
};

export default Hero;
