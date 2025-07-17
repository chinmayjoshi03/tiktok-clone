import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Color palette
export const colors = {
  // Primary brand colors
  primary: '#FF0050',
  primaryDark: '#E6004A',
  primaryLight: '#FF3366',
  
  // Secondary colors
  secondary: '#25F4EE',
  secondaryDark: '#1DD1CC',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Gray scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Background colors
  background: {
    primary: '#000000',
    secondary: '#1A1A1A',
    tertiary: '#2A2A2A',
    overlay: 'rgba(0, 0, 0, 0.6)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    overlayDark: 'rgba(0, 0, 0, 0.8)',
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    muted: '#666666',
    inverse: '#000000',
  },
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Social colors
  like: '#FF3040',
  comment: '#FFFFFF',
  share: '#FFFFFF',
  verified: '#1DA1F2',
} as const;

// Typography
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  fontWeights: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

// Spacing system
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
} as const;

// Layout dimensions
export const layout = {
  screen: {
    width: screenWidth,
    height: screenHeight,
  },
  
  // Common component sizes
  button: {
    height: {
      sm: 32,
      base: 44,
      lg: 56,
    },
    minWidth: 88,
  },
  
  input: {
    height: 44,
  },
  
  avatar: {
    sm: 32,
    base: 40,
    lg: 48,
    xl: 64,
    '2xl': 80,
  },
  
  icon: {
    sm: 16,
    base: 24,
    lg: 32,
    xl: 40,
  },
  
  // App specific dimensions
  video: {
    actionButtonSize: 48,
    actionButtonSpacing: 24,
    overlayPadding: 16,
    bottomSafeArea: 100,
  },
} as const;

// Animation configurations
export const animations = {
  timing: {
    fast: 150,
    base: 250,
    slow: 350,
    slower: 500,
  },
  
  easing: {
    ease: 'ease' as const,
    easeIn: 'ease-in' as const,
    easeOut: 'ease-out' as const,
    easeInOut: 'ease-in-out' as const,
  },
  
  spring: {
    damping: 15,
    stiffness: 150,
  },
} as const;

// Breakpoints for responsive design
export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

// Complete theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  animations,
  breakpoints,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;