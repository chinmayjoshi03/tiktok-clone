import { Alert } from 'react-native';

export interface AppError {
  code: string;
  message: string;
  type: 'network' | 'auth' | 'video' | 'general' | 'storage';
  recoverable: boolean;
}

export class ErrorHandler {
  // Check network connectivity - simplified version without NetInfo dependency
  static async checkNetworkConnectivity(): Promise<boolean> {
    try {
      // Simple fetch test to check connectivity
      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        cache: 'no-cache',
      });
      return response.ok;
    } catch (error) {
      console.warn('Failed to check network connectivity:', error);
      return false;
    }
  }

  // Create standardized error objects
  static createError(
    code: string,
    message: string,
    type: AppError['type'] = 'general',
    recoverable: boolean = true
  ): AppError {
    return {
      code,
      message,
      type,
      recoverable,
    };
  }

  // Handle network errors
  static handleNetworkError(error: any): AppError {
    if (error.code === 'NETWORK_REQUEST_FAILED' || error.message?.includes('network')) {
      return this.createError(
        'NETWORK_ERROR',
        'Please check your internet connection and try again.',
        'network',
        true
      );
    }
    return this.createError(
      'UNKNOWN_NETWORK_ERROR',
      'A network error occurred. Please try again.',
      'network',
      true
    );
  }

  // Handle authentication errors
  static handleAuthError(error: any): AppError {
    const errorCode = error.code || error.message;
    
    switch (errorCode) {
      case 'auth/network-request-failed':
        return this.createError(
          'AUTH_NETWORK_ERROR',
          'Network error during authentication. Please check your connection.',
          'auth',
          true
        );
      case 'auth/too-many-requests':
        return this.createError(
          'AUTH_TOO_MANY_REQUESTS',
          'Too many failed attempts. Please wait before trying again.',
          'auth',
          true
        );
      case 'auth/user-disabled':
        return this.createError(
          'AUTH_USER_DISABLED',
          'This account has been disabled. Please contact support.',
          'auth',
          false
        );
      default:
        return this.createError(
          'AUTH_ERROR',
          error.message || 'Authentication failed. Please try again.',
          'auth',
          true
        );
    }
  }

  // Handle video playback errors
  static handleVideoError(error: any): AppError {
    if (error.message?.includes('network') || error.code === 'NETWORK_ERROR') {
      return this.createError(
        'VIDEO_NETWORK_ERROR',
        'Failed to load video due to network issues.',
        'video',
        true
      );
    }
    
    if (error.message?.includes('format') || error.code === 'FORMAT_ERROR') {
      return this.createError(
        'VIDEO_FORMAT_ERROR',
        'Video format not supported.',
        'video',
        false
      );
    }
    
    return this.createError(
      'VIDEO_PLAYBACK_ERROR',
      'Failed to play video. Skipping to next.',
      'video',
      true
    );
  }

  // Show user-friendly error messages
  static showError(error: AppError, onRetry?: () => void): void {
    const buttons = error.recoverable && onRetry 
      ? [
          { text: 'Cancel', style: 'cancel' as const },
          { text: 'Retry', onPress: onRetry }
        ]
      : [{ text: 'OK' }];

    Alert.alert(
      'Error',
      error.message,
      buttons
    );
  }

  // Log errors for debugging
  static logError(error: AppError, context?: string): void {
    console.error(`[${error.type.toUpperCase()}] ${error.code}:`, {
      message: error.message,
      context,
      recoverable: error.recoverable,
      timestamp: new Date().toISOString(),
    });

    // Also send to error reporting service
    try {
      const { ErrorReportingService } = require('../services/errorReporting');
      ErrorReportingService.logError(error, context || 'Unknown');
    } catch (reportingError) {
      console.warn('Failed to report error:', reportingError);
    }
  }

  // Handle errors with automatic retry logic
  static async handleWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        // Check if it's a network error and we should retry
        const isNetworkConnected = await this.checkNetworkConnectivity();
        if (!isNetworkConnected && attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
          continue;
        }
        
        // If it's the last attempt or not a recoverable error, throw
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    
    throw lastError;
  }
}