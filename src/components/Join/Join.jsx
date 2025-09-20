import Container from '../common/Container/Container';
import Section from '../common/Section/Section';
import AppButton from '../ui/AppButton/AppButton';
import css from './Join.module.css';

const Join = () => {
  return (
    <Container>
      <Section>
        <div className={css.bcgImage}>
          <h2 className={css.title}>Приєднуйтесь до нашої спільноти</h2>
          <p className={css.text}>
            Долучайтеся до мандрівників, які діляться своїми історіями та
            надихають на нові пригоди.
          </p>
          <AppButton className={css.button}>Зареєструватися</AppButton>
        </div>
      </Section>
    </Container>
  );
};

export default Join;
