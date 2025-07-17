// Type guard utilities for runtime type checking

import { User, AuthError, SignUpData, SignInData } from '../types/auth';
import { Video, VideoCreator, VideoStats, VideoMusic } from '../types';

// Auth type guards
export const isUser = (obj: any): obj is User => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.uid === 'string' &&
    (obj.email === null || typeof obj.email === 'string') &&
    (obj.displayName === null || typeof obj.displayName === 'string') &&
    (obj.photoURL === null || typeof obj.photoURL === 'string')
  );
};

export const isAuthError = (obj: any): obj is AuthError => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.code === 'string' &&
    typeof obj.message === 'string'
  );
};

export const isSignUpData = (obj: any): obj is SignUpData => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.email === 'string' &&
    typeof obj.password === 'string' &&
    (obj.displayName === undefined || typeof obj.displayName === 'string')
  );
};

export const isSignInData = (obj: any): obj is SignInData => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.email === 'string' &&
    typeof obj.password === 'string'
  );
};

// Video type guards
export const isVideoCreator = (obj: any): obj is VideoCreator => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.username === 'string' &&
    typeof obj.avatar === 'string' &&
    (obj.verified === undefined || typeof obj.verified === 'boolean')
  );
};

export const isVideoStats = (obj: any): obj is VideoStats => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.likes === 'number' &&
    typeof obj.comments === 'number' &&
    typeof obj.shares === 'number' &&
    (obj.views === undefined || typeof obj.views === 'number')
  );
};

export const isVideoMusic = (obj: any): obj is VideoMusic => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.title === 'string' &&
    typeof obj.artist === 'string'
  );
};

export const isVideo = (obj: any): obj is Video => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.url === 'string' &&
    typeof obj.thumbnail === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    isVideoCreator(obj.creator) &&
    isVideoStats(obj.stats) &&
    (obj.music === undefined || isVideoMusic(obj.music)) &&
    typeof obj.duration === 'number' &&
    obj.createdAt instanceof Date
  );
};

// Array type guards
export const isVideoArray = (obj: any): obj is Video[] => {
  return Array.isArray(obj) && obj.every(isVideo);
};

// Generic utility type guards
export const isString = (obj: any): obj is string => {
  return typeof obj === 'string';
};

export const isNumber = (obj: any): obj is number => {
  return typeof obj === 'number' && !isNaN(obj);
};

export const isBoolean = (obj: any): obj is boolean => {
  return typeof obj === 'boolean';
};

export const isDate = (obj: any): obj is Date => {
  return obj instanceof Date && !isNaN(obj.getTime());
};

export const isNonEmptyString = (obj: any): obj is string => {
  return isString(obj) && obj.trim().length > 0;
};

export const isValidEmail = (obj: any): obj is string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return isString(obj) && emailRegex.test(obj);
};

export const isValidUrl = (obj: any): obj is string => {
  if (!isString(obj)) return false;
  try {
    new URL(obj);
    return true;
  } catch {
    return false;
  }
};