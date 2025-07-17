import { Dimensions, PixelRatio, Platform } from 'react-native';
import { theme } from './theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Device detection constants
const device = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isWeb: Platform.OS === 'web',

  // Screen size categories
  isSmallPhone: SCREEN_WIDTH < 375,
  isPhone: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768,
  isTablet: SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024,
  isDesktop: SCREEN_WIDTH >= 1024,

  // Orientation
  isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
  isPortrait: SCREEN_HEIGHT > SCREEN_WIDTH,

  // Pixel density
  pixelRatio: PixelRatio.get(),
  isHighDensity: PixelRatio.get() >= 2,
};

// Enhanced responsive utilities for better cross-device support
export const responsiveUtils = {
  // Device detection
  device,

  // Responsive spacing based on device type
  spacing: {
    xs: (multiplier: number = 1) => {
      const base = theme.spacing[1];
      return device.isTablet ? base * 1.5 * multiplier : base * multiplier;
    },
    sm: (multiplier: number = 1) => {
      const base = theme.spacing[2];
      return device.isTablet ? base * 1.5 * multiplier : base * multiplier;
    },
    md: (multiplier: number = 1) => {
      const base = theme.spacing[4];
      return device.isTablet ? base * 1.5 * multiplier : base * multiplier;
    },
    lg: (multiplier: number = 1) => {
      const base = theme.spacing[6];
      return device.isTablet ? base * 1.5 * multiplier : base * multiplier;
    },
    xl: (multiplier: number = 1) => {
      const base = theme.spacing[8];
      return device.isTablet ? base * 1.5 * multiplier : base * multiplier;
    },
  },

  // Responsive font sizes with better scaling
  fontSize: {
    xs: () => device.isTablet ? 14 : 12,
    sm: () => device.isTablet ? 16 : 14,
    base: () => device.isTablet ? 18 : 16,
    lg: () => device.isTablet ? 20 : 18,
    xl: () => device.isTablet ? 24 : 20,
    '2xl': () => device.isTablet ? 28 : 24,
    '3xl': () => device.isTablet ? 36 : 30,
    '4xl': () => device.isTablet ? 42 : 36,
    '5xl': () => device.isTablet ? 56 : 48,
  },

  // Safe area handling
  safeArea: {
    top: device.isIOS ? 44 : 24,
    bottom: device.isIOS ? 34 : 0,
    horizontal: 16,
  },

  // Video-specific responsive values
  video: {
    actionButtonSize: device.isTablet ? 56 : 48,
    actionButtonSpacing: device.isTablet ? 32 : 24,
    overlayPadding: device.isTablet ? 24 : 16,
    bottomSafeArea: device.isTablet ? 120 : 100,
  },

  // Responsive breakpoint utilities
  breakpoint: {
    up: (size: keyof typeof theme.breakpoints) => SCREEN_WIDTH >= theme.breakpoints[size],
    down: (size: keyof typeof theme.breakpoints) => SCREEN_WIDTH < theme.breakpoints[size],
    only: (size: keyof typeof theme.breakpoints) => {
      const breakpoints = Object.entries(theme.breakpoints);
      const currentIndex = breakpoints.findIndex(([key]) => key === size);
      const current = breakpoints[currentIndex][1];
      const next = breakpoints[currentIndex + 1]?.[1];

      return SCREEN_WIDTH >= current && (next ? SCREEN_WIDTH < next : true);
    },
  },
};