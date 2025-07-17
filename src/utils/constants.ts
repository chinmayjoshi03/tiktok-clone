// Application constants

// Screen dimensions and layout
export const SCREEN_CONSTANTS = {
  VIDEO_ASPECT_RATIO: 9 / 16,
  HEADER_HEIGHT: 60,
  TAB_BAR_HEIGHT: 80,
  SAFE_AREA_PADDING: 20,
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500,
  LIKE_ANIMATION: 800,
} as const;

// Video playback constants
export const VIDEO_CONSTANTS = {
  PRELOAD_COUNT: 2,
  MAX_CACHE_SIZE: 100 * 1024 * 1024, // 100MB
  SEEK_INTERVAL: 1000,
  VOLUME_DEFAULT: 1.0,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  BORDER_RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
    CIRCLE: 50,
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
  FONT_SIZES: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 24,
    XXL: 32,
  },
} as const;

// Colors
export const COLORS = {
  PRIMARY: '#FF0050',
  SECONDARY: '#25F4EE',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: {
    LIGHT: '#F5F5F5',
    MEDIUM: '#CCCCCC',
    DARK: '#666666',
  },
  BACKGROUND: '#000000',
  TEXT: {
    PRIMARY: '#FFFFFF',
    SECONDARY: '#CCCCCC',
    MUTED: '#666666',
  },
  OVERLAY: 'rgba(0, 0, 0, 0.3)',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  VIDEO_LOAD_ERROR: 'Failed to load video. Skipping to next video.',
  AUTH_ERROR: 'Authentication failed. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
} as const;