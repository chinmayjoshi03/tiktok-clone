// Core application types and interfaces

// Re-export auth types
export * from './auth';

// Import types for use in this file
import { User, AuthError } from './auth';

// Video related types
export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  creator: VideoCreator;
  stats: VideoStats;
  music?: VideoMusic;
  duration: number;
  createdAt: Date;
}

export interface VideoCreator {
  username: string;
  avatar: string;
  verified?: boolean;
}

export interface VideoStats {
  likes: number;
  comments: number;
  shares: number;
  views?: number;
}

export interface VideoMusic {
  title: string;
  artist: string;
}

// App State types
export interface AppState {
  user: User | null;
  videos: Video[];
  currentVideoIndex: number;
  isLoading: boolean;
  error: string | null;
}

// Context types
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: AuthError | null;
}

export interface VideoContextType {
  videos: Video[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  likeVideo: (videoId: string) => Promise<void>;
  isLoading: boolean;
  error: any;
  retryLoadVideos: () => Promise<void>;
}

// Navigation types
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type MainStackParamList = {
  VideoFeed: undefined;
  Profile: { userId?: string };
  Comments: { videoId: string };
};

export type RootStackParamList = AuthStackParamList & MainStackParamList;

// Component prop types
export interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onVideoEnd?: () => void;
}

export interface VideoOverlayProps {
  video: Video;
  onProfilePress: (username: string) => void;
}

export interface ActionButtonsProps {
  video: Video;
  onLike: (videoId: string) => Promise<void>;
  onComment: (videoId: string) => void;
  onShare: (videoId: string) => void;
}

