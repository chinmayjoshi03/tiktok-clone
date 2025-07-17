import { AccessibilityInfo } from 'react-native';
import { theme } from './theme';

// Accessibility utilities for better user experience
export const accessibilityUtils = {
  // Minimum touch target sizes (44x44 points on iOS, 48x48 dp on Android)
  minTouchTarget: {
    width: 44,
    height: 44,
  },

  // Color contrast utilities
  contrast: {
    // Check if color combination meets WCAG AA standards
    meetsWCAG: (foreground: string, background: string): boolean => {
      // This is a simplified check - in production, use a proper contrast ratio library
      const fgLuminance = accessibilityUtils.contrast.getLuminance(foreground);
      const bgLuminance = accessibilityUtils.contrast.getLuminance(background);
      const ratio = accessibilityUtils.contrast.getContrastRatio(fgLuminance, bgLuminance);
      return ratio >= 4.5; // WCAG AA standard for normal text
    },

    // Calculate relative luminance (simplified)
    getLuminance: (color: string): number => {
      // This is a simplified calculation - use a proper color library in production
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      const sRGB = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    },

    // Calculate contrast ratio
    getContrastRatio: (luminance1: number, luminance2: number): number => {
      const lighter = Math.max(luminance1, luminance2);
      const darker = Math.min(luminance1, luminance2);
      return (lighter + 0.05) / (darker + 0.05);
    },
  },

  // Screen reader utilities
  screenReader: {
    // Check if screen reader is enabled
    isEnabled: async (): Promise<boolean> => {
      try {
        return await AccessibilityInfo.isScreenReaderEnabled();
      } catch {
        return false;
      }
    },

    // Announce message to screen reader
    announce: (message: string): void => {
      AccessibilityInfo.announceForAccessibility(message);
    },

    // Common accessibility labels for video app
    labels: {
      like: (isLiked: boolean, count: number) => 
        `${isLiked ? 'Unlike' : 'Like'} video. ${count} likes`,
      comment: (count: number) => `Comment on video. ${count} comments`,
      share: (count: number) => `Share video. ${count} shares`,
      profile: (username: string) => `View ${username}'s profile`,
      video: (description: string, creator: string) => 
        `Video by ${creator}. ${description}`,
      playPause: (isPlaying: boolean) => isPlaying ? 'Pause video' : 'Play video',
    },
  },

  // Focus management
  focus: {
    // Styles for focus indicators
    indicator: {
      borderWidth: 2,
      borderColor: theme.colors.info,
      borderRadius: theme.borderRadius.sm,
    },

    // Ensure element is focusable
    makeFocusable: {
      accessible: true,
      accessibilityRole: 'button' as const,
    },
  },

  // Reduced motion support
  motion: {
    // Check if user prefers reduced motion
    prefersReducedMotion: false, // This would be set based on system settings

    // Animation durations that respect reduced motion
    duration: (normalDuration: number): number => {
      return accessibilityUtils.motion.prefersReducedMotion ? 0 : normalDuration;
    },
  },

  // Text scaling support
  text: {
    // Ensure text scales properly with system font size
    scalable: {
      allowFontScaling: true,
      maxFontSizeMultiplier: 2, // Limit scaling to prevent layout issues
    },

    // Minimum font sizes for readability
    minSize: {
      body: 14,
      caption: 12,
      button: 16,
    },
  },

  // Common accessibility props generators
  props: {
    button: (label: string, hint?: string) => ({
      accessible: true,
      accessibilityRole: 'button' as const,
      accessibilityLabel: label,
      accessibilityHint: hint,
    }),

    image: (label: string) => ({
      accessible: true,
      accessibilityRole: 'image' as const,
      accessibilityLabel: label,
    }),

    text: (label?: string) => ({
      accessible: true,
      accessibilityRole: 'text' as const,
      accessibilityLabel: label,
    }),

    video: (label: string, state?: string) => ({
      accessible: true,
      accessibilityRole: 'none' as const, // Videos are complex, handle manually
      accessibilityLabel: label,
      accessibilityState: state ? { expanded: state === 'playing' } : undefined,
    }),
  },
};