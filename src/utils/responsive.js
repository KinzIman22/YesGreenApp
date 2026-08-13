import { useWindowDimensions } from 'react-native';

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();

  // Breakpoints
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isLaptopOrDesktop = width >= 1024;

  // Max width container for web/desktops so it looks neat like a mobile app wrapper
  const containerMaxWidth = isMobile ? '100%' : isTablet ? 540 : 600;

  return {
    width,
    isMobile,
    isTablet,
    isLaptopOrDesktop,
    containerMaxWidth,
  };
};