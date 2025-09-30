import { BounceLoader } from 'react-spinners';
import style from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={style.loaderBackdrop}>
      <BounceLoader
        loading
        size={60}
        speedMultiplier={1}
        color={'var(--color-royal-blue)'}
      />
    </div>
  );
};

export default Loader;
