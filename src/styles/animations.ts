import { Animated, Easing } from 'react-native';
import { theme } from './theme';

// Enhanced animation utilities for better UX
export const createAnimations = () => {
  // Bounce animation for likes and interactions
  const createBounceAnimation = (animatedValue: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2,
        duration: theme.animations.timing.fast,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: theme.animations.timing.fast,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);
  };

  // Pulse animation for loading states
  const createPulseAnimation = (animatedValue: Animated.Value) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.1,
          duration: theme.animations.timing.base,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: theme.animations.timing.base,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
  };

  // Fade in animation for screen transitions
  const createFadeInAnimation = (animatedValue: Animated.Value) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration: theme.animations.timing.slow,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    });
  };

  // Slide up animation for modals and sheets
  const createSlideUpAnimation = (animatedValue: Animated.Value) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration: theme.animations.timing.slow,
      easing: Easing.out(Easing.back(1.1)),
      useNativeDriver: true,
    });
  };

  // Scale animation for button presses
  const createScaleAnimation = (animatedValue: Animated.Value, scale: number = 0.95) => {
    return Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: scale,
        duration: theme.animations.timing.fast / 2,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: theme.animations.timing.fast / 2,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);
  };

  // Shake animation for errors
  const createShakeAnimation = (animatedValue: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(animatedValue, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(animatedValue, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]);
  };

  return {
    createBounceAnimation,
    createPulseAnimation,
    createFadeInAnimation,
    createSlideUpAnimation,
    createScaleAnimation,
    createShakeAnimation,
  };
};

// Pre-configured animation presets
export const animationPresets = {
  // Quick bounce for likes
  quickBounce: {
    duration: theme.animations.timing.fast,
    scale: 1.2,
  },

  // Gentle pulse for loading
  gentlePulse: {
    duration: theme.animations.timing.base,
    scale: 1.05,
  },

  // Smooth fade
  smoothFade: {
    duration: theme.animations.timing.slow,
  },

  // Button press feedback
  buttonPress: {
    duration: theme.animations.timing.fast / 2,
    scale: 0.95,
  },
};

export const {
  createBounceAnimation,
  createPulseAnimation,
  createFadeInAnimation,
  createSlideUpAnimation,
  createScaleAnimation,
  createShakeAnimation,
} = createAnimations();