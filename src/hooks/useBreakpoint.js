import { useMediaQuery } from 'react-responsive';
import { BREAKPOINTS as BP } from '../constants/breakpoints';

/**
 * Custom React hook for responsive design based on predefined breakpoints.
 *
 * Uses `react-responsive` to determine the current screen size.
 * Breakpoints are imported from `../constants/breakpoints`.
 *
 * @returns {{
 *   isMobile: boolean,
 *   isTablet: boolean,
 *   isDesktop: boolean
 * }}
 *
 * @example
 * const { isMobile, isTablet, isDesktop } = useBreakpoint();
 * if (isMobile) {
 *   console.log('Render mobile layout');
 * }
 */
const useBreakpoint = () => {
  const isMobile = useMediaQuery({ maxWidth: BP.tablet - 1 });
  const isTablet = useMediaQuery({
    minWidth: BP.tablet,
    maxWidth: BP.desktop - 1,
  });
  const isDesktop = useMediaQuery({ minWidth: BP.desktop });

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useBreakpoint;
