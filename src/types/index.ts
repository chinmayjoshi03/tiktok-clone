// Basic types for TikTok Clone
export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  creator: {
    username: string;
    avatar: string;
    verified?: boolean;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  music?: {
    title: string;
    artist: string;
  };
  duration: number;
  createdAt: Date;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}