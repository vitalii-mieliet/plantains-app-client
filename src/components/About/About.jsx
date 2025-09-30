import travelLaggage from '../../assets/icons/travel_luggage_and_bags.svg';
import communication from '../../assets/icons/communication.svg';
import Container from '../common/Container/Container';
import wandStars from '../../assets/icons/wand_stars.svg';
import Section from '../common/Section/Section';
import css from './About.module.css';

const About = () => {
  return (
    <Section>
      <Container>
        <div className={css.firstWrapper}>
          <h2 className={css.title}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={css.textAbout}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділилися. Наша платформа створена, щоб об'єднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>
        <ul className={css.list}>
          <li className={css.listItem}>
            <img className={css.icon} src={wandStars} alt="Wand Stars" />
            <h3 className={css.subtitle}>Наша місія</h3>
            <p className={css.text}>
              Об'єднувати людей через любов до пригод та надихати на нові
              відкриття.
            </p>
          </li>
          <li className={css.listItem}>
            <img
              className={css.icon}
              src={travelLaggage}
              alt="Travel Laggage"
            />
            <h3 className={css.subtitle}>Автентичні історії</h3>
            <p className={css.text}>
              Ми цінуємо справжні, нередаговані враження від мандрівників з
              усього світу.
            </p>
          </li>
          <li className={css.listItem}>
            <img className={css.icon} src={communication} alt="Wand Stars" />
            <h3 className={css.subtitle}>Ваша спільнота</h3>
            <p className={css.text}>
              Станьте частиною спільноти, де кожен може бути і автором, і
              читачем.
            </p>
          </li>
        </ul>
      </Container>
    </Section>
  );
};

export default About;
