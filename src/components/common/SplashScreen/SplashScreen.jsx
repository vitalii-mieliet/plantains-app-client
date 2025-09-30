import { useState, useEffect } from 'react';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import styles from './SplashScreen.module.css';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // швидкість завантаження
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <div className={styles.content}>
        {/* лого */}
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        {/* заголовок */}
        <h1 className={styles.title}>Завантажуємо ваші історії...</h1>

        {/* прогрес бар */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className={styles.progressText}>{progress}%</p>
        </div>
      </div>
    </Container>
  );
};

export default SplashScreen;
