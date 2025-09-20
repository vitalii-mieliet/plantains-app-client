import { ReactComponent as LogoIcon } from '../../../assets/icons/logo_text.svg';

const Logo = ({ color = 'currentColor', className, ...props }) => {
  return <LogoIcon className={className} style={{ color }} {...props} />;
};

export default Logo;

// колір через пропси або стилі
//  <Logo color="black" /> футер
//  <Logo color="white" /> хедер
