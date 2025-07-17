import { FirebaseAuthErrorCodes } from '../types/auth';

export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case FirebaseAuthErrorCodes.EMAIL_ALREADY_IN_USE:
      return 'An account with this email already exists.';
    case FirebaseAuthErrorCodes.INVALID_EMAIL:
      return 'Please enter a valid email address.';
    case FirebaseAuthErrorCodes.OPERATION_NOT_ALLOWED:
      return 'This sign-in method is not enabled. Please contact support.';
    case FirebaseAuthErrorCodes.WEAK_PASSWORD:
      return 'Password should be at least 6 characters long.';
    case FirebaseAuthErrorCodes.USER_DISABLED:
      return 'This account has been disabled. Please contact support.';
    case FirebaseAuthErrorCodes.USER_NOT_FOUND:
      return 'No account found with this email address.';
    case FirebaseAuthErrorCodes.WRONG_PASSWORD:
      return 'Incorrect password. Please try again.';
    case FirebaseAuthErrorCodes.TOO_MANY_REQUESTS:
      return 'Too many failed attempts. Please try again later.';
    case FirebaseAuthErrorCodes.NETWORK_REQUEST_FAILED:
      return 'Network error. Please check your connection and try again.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
};