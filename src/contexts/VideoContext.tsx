import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Video, VideoContextType } from '../types';
import { VideoService } from '../services/video';
import { ErrorHandler, AppError } from '../utils/errorHandler';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { StorageService } from '../services/storage';
import { useAppLifecycle } from '../hooks/useAppLifecycle';

// Video state interface
interface VideoState {
  videos: Video[];
  currentIndex: number;
  isLoading: boolean;
  error: AppError | null;
  likedVideos: Set<string>;
  retryCount: number;
  videoLoadingStates: Map<string, boolean>;
  videoErrors: Map<string, AppError>;
}

// Video actions
type VideoAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_VIDEOS'; payload: Video[] }
  | { type: 'SET_CURRENT_INDEX'; payload: number }
  | { type: 'SET_ERROR'; payload: AppError | null }
  | { type: 'LIKE_VIDEO'; payload: string }
  | { type: 'UNLIKE_VIDEO'; payload: string }
  | { type: 'UPDATE_VIDEO_STATS'; payload: { videoId: string; stats: Partial<Video['stats']> } }
  | { type: 'SET_VIDEO_LOADING'; payload: { videoId: string; loading: boolean } }
  | { type: 'SET_VIDEO_ERROR'; payload: { videoId: string; error: AppError | null } }
  | { type: 'INCREMENT_RETRY_COUNT' }
  | { type: 'RESET_RETRY_COUNT' }
  | { type: 'RESTORE_STATE'; payload: { currentIndex: number; likedVideos: string[] } };

// Initial state
const initialState: VideoState = {
  videos: [],
  currentIndex: 0,
  isLoading: false,
  error: null,
  likedVideos: new Set(),
  retryCount: 0,
  videoLoadingStates: new Map(),
  videoErrors: new Map(),
};

// Video reducer
function videoReducer(state: VideoState, action: VideoAction): VideoState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload, error: null, retryCount: 0 };
    
    case 'SET_CURRENT_INDEX':
      return { ...state, currentIndex: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'LIKE_VIDEO':
      return {
        ...state,
        likedVideos: new Set([...state.likedVideos, action.payload]),
        videos: state.videos.map(video =>
          video.id === action.payload
            ? { ...video, stats: { ...video.stats, likes: video.stats.likes + 1 } }
            : video
        ),
      };
    
    case 'UNLIKE_VIDEO':
      const newLikedVideos = new Set(state.likedVideos);
      newLikedVideos.delete(action.payload);
      return {
        ...state,
        likedVideos: newLikedVideos,
        videos: state.videos.map(video =>
          video.id === action.payload
            ? { ...video, stats: { ...video.stats, likes: Math.max(0, video.stats.likes - 1) } }
            : video
        ),
      };
    
    case 'UPDATE_VIDEO_STATS':
      return {
        ...state,
        videos: state.videos.map(video =>
          video.id === action.payload.videoId
            ? { ...video, stats: { ...video.stats, ...action.payload.stats } }
            : video
        ),
      };
    
    case 'SET_VIDEO_LOADING':
      const newLoadingStates = new Map(state.videoLoadingStates);
      newLoadingStates.set(action.payload.videoId, action.payload.loading);
      return { ...state, videoLoadingStates: newLoadingStates };
    
    case 'SET_VIDEO_ERROR':
      const newVideoErrors = new Map(state.videoErrors);
      if (action.payload.error) {
        newVideoErrors.set(action.payload.videoId, action.payload.error);
      } else {
        newVideoErrors.delete(action.payload.videoId);
      }
      return { ...state, videoErrors: newVideoErrors };
    
    case 'INCREMENT_RETRY_COUNT':
      return { ...state, retryCount: state.retryCount + 1 };
    
    case 'RESET_RETRY_COUNT':
      return { ...state, retryCount: 0 };
    
    case 'RESTORE_STATE':
      return {
        ...state,
        currentIndex: action.payload.currentIndex,
        likedVideos: new Set(action.payload.likedVideos),
      };
    
    default:
      return state;
  }
}

// Create context
const VideoContext = createContext<VideoContextType | undefined>(undefined);

// Provider component
interface VideoProviderProps {
  children: ReactNode;
}

export function VideoProvider({ children }: VideoProviderProps) {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  const networkStatus = useNetworkStatus();
  const appLifecycle = useAppLifecycle();

  // Restore state on mount
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedState = await StorageService.getAppState();
        dispatch({
          type: 'RESTORE_STATE',
          payload: {
            currentIndex: savedState.videoState.currentIndex,
            likedVideos: savedState.videoState.likedVideos,
          },
        });
      } catch (error) {
        ErrorHandler.logError(
          ErrorHandler.createError('STORAGE_ERROR', 'Failed to restore video state', 'storage', false),
          'VideoContext.restoreState'
        );
      }
    };

    restoreState();
    loadVideos();
  }, []);

  // Save state when app goes to background
  useEffect(() => {
    if (appLifecycle.isBackground) {
      const saveState = async () => {
        try {
          await StorageService.saveVideoState({
            currentIndex: state.currentIndex,
            likedVideos: Array.from(state.likedVideos),
            watchHistory: [], // Will be updated separately when videos are watched
          });
        } catch (error) {
          ErrorHandler.logError(
            ErrorHandler.createError('STORAGE_ERROR', 'Failed to save video state', 'storage', false),
            'VideoContext.saveState'
          );
        }
      };
      saveState();
    }
  }, [appLifecycle.isBackground, state.currentIndex, state.likedVideos]);

  // Clear error when network comes back online
  useEffect(() => {
    if (networkStatus.isConnected && state.error?.type === 'network') {
      dispatch({ type: 'SET_ERROR', payload: null });
    }
  }, [networkStatus.isConnected, state.error]);

  const loadVideos = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'RESET_RETRY_COUNT' });
      
      const videos = await ErrorHandler.handleWithRetry(
        () => VideoService.getVideos(),
        3,
        1000
      );
      
      dispatch({ type: 'SET_VIDEOS', payload: videos });
    } catch (error: any) {
      const appError = ErrorHandler.handleNetworkError(error);
      dispatch({ type: 'SET_ERROR', payload: appError });
      ErrorHandler.logError(appError, 'VideoContext.loadVideos');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const retryLoadVideos = async () => {
    if (state.retryCount < 3) {
      dispatch({ type: 'INCREMENT_RETRY_COUNT' });
      await loadVideos();
    }
  };

  const setCurrentIndex = async (index: number) => {
    if (index >= 0 && index < state.videos.length) {
      dispatch({ type: 'SET_CURRENT_INDEX', payload: index });
      
      // Add to watch history
      const currentVideo = state.videos[index];
      if (currentVideo) {
        await StorageService.addToWatchHistory(currentVideo.id);
      }
      
      // Save current index
      try {
        await StorageService.saveVideoState({
          currentIndex: index,
          likedVideos: Array.from(state.likedVideos),
          watchHistory: [], // Will be updated by addToWatchHistory
        });
      } catch (error) {
        ErrorHandler.logError(
          ErrorHandler.createError('STORAGE_ERROR', 'Failed to save current video index', 'storage', false),
          'VideoContext.setCurrentIndex'
        );
      }
    }
  };

  const likeVideo = async (videoId: string) => {
    try {
      const isLiked = state.likedVideos.has(videoId);
      
      if (isLiked) {
        const success = await ErrorHandler.handleWithRetry(
          () => VideoService.unlikeVideo(videoId),
          2,
          500
        );
        if (success) {
          dispatch({ type: 'UNLIKE_VIDEO', payload: videoId });
          await StorageService.toggleLikedVideo(videoId, false);
        }
      } else {
        const success = await ErrorHandler.handleWithRetry(
          () => VideoService.likeVideo(videoId),
          2,
          500
        );
        if (success) {
          dispatch({ type: 'LIKE_VIDEO', payload: videoId });
          await StorageService.toggleLikedVideo(videoId, true);
        }
      }
    } catch (error: any) {
      const appError = ErrorHandler.createError(
        'LIKE_ERROR',
        'Failed to update like status',
        'video',
        true
      );
      dispatch({ type: 'SET_ERROR', payload: appError });
      ErrorHandler.logError(appError, 'VideoContext.likeVideo');
    }
  };

  const shareVideo = async (videoId: string) => {
    try {
      const success = await ErrorHandler.handleWithRetry(
        () => VideoService.shareVideo(videoId),
        2,
        500
      );
      if (success) {
        dispatch({
          type: 'UPDATE_VIDEO_STATS',
          payload: {
            videoId,
            stats: {
              shares: state.videos.find(v => v.id === videoId)?.stats.shares! + 1
            }
          }
        });
      }
    } catch (error: any) {
      const appError = ErrorHandler.createError(
        'SHARE_ERROR',
        'Failed to share video',
        'video',
        true
      );
      dispatch({ type: 'SET_ERROR', payload: appError });
      ErrorHandler.logError(appError, 'VideoContext.shareVideo');
    }
  };

  const contextValue: VideoContextType = {
    videos: state.videos,
    currentIndex: state.currentIndex,
    setCurrentIndex,
    likeVideo,
    isLoading: state.isLoading,
    error: state.error,
    retryLoadVideos,
  };

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
}

// Custom hook to use video context
export function useVideo(): VideoContextType {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}

export default VideoContext;