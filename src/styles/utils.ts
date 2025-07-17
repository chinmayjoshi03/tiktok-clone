import { Dimensions, PixelRatio } from 'react-native';
import { theme } from './theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive design utilities
export const responsive = {
  // Scale based on screen width (iPhone 6/7/8 as base: 375px)
  scale: (size: number) => {
    const baseWidth = 375;
    return (SCREEN_WIDTH / baseWidth) * size;
  },
  
  // Vertical scale based on screen height (iPhone 6/7/8 as base: 667px)
  verticalScale: (size: number) => {
    const baseHeight = 667;
    return (SCREEN_HEIGHT / baseHeight) * size;
  },
  
  // Moderate scale - less aggressive scaling
  moderateScale: (size: number, factor: number = 0.5) => {
    return size + (responsive.scale(size) - size) * factor;
  },
  
  // Get responsive font size
  fontSize: (size: keyof typeof theme.typography.fontSizes) => {
    const baseSize = theme.typography.fontSizes[size];
    return responsive.moderateScale(baseSize, 0.3);
  },
  
  // Check if device is tablet
  isTablet: () => {
    const pixelDensity = PixelRatio.get();
    const adjustedWidth = SCREEN_WIDTH * pixelDensity;
    const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
    
    return (adjustedWidth >= 1000 || adjustedHeight >= 1000);
  },
  
  // Check screen size categories
  isSmallScreen: () => SCREEN_WIDTH < theme.breakpoints.sm,
  isMediumScreen: () => SCREEN_WIDTH >= theme.breakpoints.sm && SCREEN_WIDTH < theme.breakpoints.md,
  isLargeScreen: () => SCREEN_WIDTH >= theme.breakpoints.md,
};

// Base mixins without self-references
const baseMixins = {
  // Flexbox utilities
  center: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  
  centerHorizontal: {
    alignItems: 'center' as const,
  },
  
  centerVertical: {
    justifyContent: 'center' as const,
  },
  
  spaceBetween: {
    justifyContent: 'space-between' as const,
  },
  
  spaceAround: {
    justifyContent: 'space-around' as const,
  },
  
  // Position utilities
  absoluteFill: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  absoluteCenter: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  
  // Overlay styles
  overlay: {
    light: {
      backgroundColor: theme.colors.background.overlayLight,
    },
    
    base: {
      backgroundColor: theme.colors.background.overlay,
    },
    
    dark: {
      backgroundColor: theme.colors.background.overlayDark,
    },
  },
};

// Common style mixins with references to base mixins
export const mixins = {
  ...baseMixins,
  
  // Common button styles
  button: {
    primary: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[6],
      ...baseMixins.center,
      minHeight: theme.layout.button.height.base,
    },
    
    secondary: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[6],
      ...baseMixins.center,
      minHeight: theme.layout.button.height.base,
      borderWidth: 1,
      borderColor: theme.colors.gray[700],
    },
    
    ghost: {
      backgroundColor: 'transparent',
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[6],
      ...baseMixins.center,
      minHeight: theme.layout.button.height.base,
    },
  },
  
  // Text input styles
  input: {
    base: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[4],
      fontSize: responsive.fontSize('base'),
      color: theme.colors.text.primary,
      minHeight: theme.layout.input.height,
      borderWidth: 1,
      borderColor: theme.colors.gray[700],
    },
    
    focused: {
      borderColor: theme.colors.primary,
      ...theme.shadows.sm,
    },
    
    error: {
      borderColor: theme.colors.error,
    },
  },
  
  // Card styles
  card: {
    base: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      ...theme.shadows.base,
    },
    
    elevated: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      ...theme.shadows.lg,
    },
  },
  
  // Avatar styles
  avatar: (size: keyof typeof theme.layout.avatar = 'base') => ({
    width: theme.layout.avatar[size],
    height: theme.layout.avatar[size],
    borderRadius: theme.layout.avatar[size] / 2,
    backgroundColor: theme.colors.gray[600],
    ...baseMixins.center,
  }),
};

// Animation utilities
export const animations = {
  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  
  // Scale animations
  scaleIn: {
    from: { transform: [{ scale: 0.8 }], opacity: 0 },
    to: { transform: [{ scale: 1 }], opacity: 1 },
  },
  
  scaleOut: {
    from: { transform: [{ scale: 1 }], opacity: 1 },
    to: { transform: [{ scale: 0.8 }], opacity: 0 },
  },
  
  // Slide animations
  slideInUp: {
    from: { transform: [{ translateY: 50 }], opacity: 0 },
    to: { transform: [{ translateY: 0 }], opacity: 1 },
  },
  
  slideInDown: {
    from: { transform: [{ translateY: -50 }], opacity: 0 },
    to: { transform: [{ translateY: 0 }], opacity: 1 },
  },
  
  // Bounce animation for likes
  bounce: {
    from: { transform: [{ scale: 1 }] },
    to: { transform: [{ scale: 1.2 }] },
  },
};

// Utility functions
export const utils = {
  // Get text color based on background
  getContrastColor: (backgroundColor: string) => {
    // Simple contrast calculation - in a real app you might want a more sophisticated approach
    return backgroundColor === theme.colors.white ? theme.colors.text.inverse : theme.colors.text.primary;
  },
  
  // Format numbers for display
  formatNumber: (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },
  
  // Get platform-specific styles
  platformSelect: <T>(ios: T, android: T, web?: T) => {
    const Platform = require('react-native').Platform;
    if (Platform.OS === 'ios') return ios;
    if (Platform.OS === 'android') return android;
    if (Platform.OS === 'web' && web) return web;
    return android; // fallback
  },
  
  // Haptic feedback utility
  hapticFeedback: (type: 'light' | 'medium' | 'heavy' = 'light') => {
    try {
      const { Haptics } = require('expo-haptics');
      switch (type) {
        case 'light':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
      }
    } catch (error) {
      // Haptics not available, silently fail
    }
  },
};

export { theme };
export * from './animations';
export * from './responsive';
export * from './accessibility';