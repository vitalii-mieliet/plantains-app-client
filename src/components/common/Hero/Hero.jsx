// 📌 HEADER STYLES SETUP (IMPORTANT):
// The header must be fixed and transparent so the Hero section's background image is visible behind it.
// Add the following to Header.css:
//<div className={css.header}>Header</div>;
// .header {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 72px;
//   background-color: transparent;
//   z-index: 1000;
//   transition: background-color 0.3s ease;
// }
//
// This ensures the Hero background isn't covered by a solid header.

import React from 'react';
import Container from '../Container/Container';
import Section from '../Section/Section';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <Section className={css.hero}>
      <div className={css.heroBackground}>
        <Container>
          <h1 className={css.heroTitle}>Відкрийте світ подорожей з нами!</h1>
          <p className={css.heroDescription}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми історіями та отримувати натхнення для нових пригод. Відкрийте
            для себе нові місця та знайдіть однодумців!
          </p>
          <a href="#join" className={css.heroButton}>
            Доєднатись
          </a>
        </Container>
      </div>
    </Section>
  );
};

export default Hero;
