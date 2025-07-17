import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorHandler } from '../utils/errorHandler';

export interface AppState {
  videoState: {
    currentIndex: number;
    likedVideos: string[];
    watchHistory: string[];
  };
  userPreferences: {
    autoplay: boolean;
    soundEnabled: boolean;
    dataUsageMode: 'low' | 'normal' | 'high';
  };
  lastActiveTime: number;
}

const STORAGE_KEYS = {
  APP_STATE: '@tiktok_clone:app_state',
  USER_PREFERENCES: '@tiktok_clone:user_preferences',
  VIDEO_STATE: '@tiktok_clone:video_state',
} as const;

export class StorageService {
  static async saveAppState(state: Partial<AppState>): Promise<void> {
    try {
      const existingState = await this.getAppState();
      const updatedState = { ...existingState, ...state, lastActiveTime: Date.now() };
      await AsyncStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify(updatedState));
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.createError('STORAGE_ERROR', 'Failed to save app state', 'storage', false),
        'StorageService.saveAppState'
      );
    }
  }

  static async getAppState(): Promise<AppState> {
    try {
      const stateString = await AsyncStorage.getItem(STORAGE_KEYS.APP_STATE);
      if (stateString) {
        return JSON.parse(stateString);
      }
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.createError('STORAGE_ERROR', 'Failed to load app state', 'storage', false),
        'StorageService.getAppState'
      );
    }

    // Return default state
    return {
      videoState: {
        currentIndex: 0,
        likedVideos: [],
        watchHistory: [],
      },
      userPreferences: {
        autoplay: true,
        soundEnabled: true,
        dataUsageMode: 'normal',
      },
      lastActiveTime: Date.now(),
    };
  }

  static async saveVideoState(videoState: AppState['videoState']): Promise<void> {
    try {
      await this.saveAppState({ videoState });
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.createError('STORAGE_ERROR', 'Failed to save video state', 'storage', false),
        'StorageService.saveVideoState'
      );
    }
  }

  static async saveUserPreferences(preferences: AppState['userPreferences']): Promise<void> {
    try {
      await this.saveAppState({ userPreferences: preferences });
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.createError('STORAGE_ERROR', 'Failed to save user preferences', 'storage', false),
        'StorageService.saveUserPreferences'
      );
    }
  }

  static async clearAppState(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.APP_STATE);
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.createError('STORAGE_ERROR', 'Failed to clear app state', 'storage', false),
        'StorageService.clearAppState'
      );
    }
  }

  static async addToWatchHistory(videoId: string): Promise<void> {
    try {
      const state = await this.getAppState();
      const watchHistory = [...state.videoState.watchHistory];
      
      // Remove if already exists to avoid duplicates
      const existingIndex = watchHistory.indexOf(videoId);
      if (existingIndex > -1) {
        watchHistory.splice(existingIndex, 1);
      }
      
      // Add to beginning and limit to 100 items
      watchHistory.unshift(videoId);
      if (watchHistory.length > 100) {
        watchHistory.splice(100);
      }
      
      await this.saveVideoState({
        ...state.videoState,
        watchHistory,
      });
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.createError('STORAGE_ERROR', 'Failed to update watch history', 'storage', false),
        'StorageService.addToWatchHistory'
      );
    }
  }

  static async toggleLikedVideo(videoId: string, isLiked: boolean): Promise<void> {
    try {
      const state = await this.getAppState();
      let likedVideos = [...state.videoState.likedVideos];
      
      if (isLiked) {
        if (!likedVideos.includes(videoId)) {
          likedVideos.push(videoId);
        }
      } else {
        likedVideos = likedVideos.filter(id => id !== videoId);
      }
      
      await this.saveVideoState({
        ...state.videoState,
        likedVideos,
      });
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.createError('STORAGE_ERROR', 'Failed to update liked videos', 'storage', false),
        'StorageService.toggleLikedVideo'
      );
    }
  }
}