import { AppError, ErrorHandler } from './errorHandler';

export interface ValidationResult {
  isValid: boolean;
  error?: AppError;
}

export class ValidationService {
  // Email validation
  static validateEmail(email: string): ValidationResult {
    if (!email || email.trim().length === 0) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_EMAIL_REQUIRED',
          'Email address is required',
          'general',
          false
        )
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_EMAIL_INVALID',
          'Please enter a valid email address',
          'general',
          false
        )
      };
    }

    return { isValid: true };
  }

  // Password validation
  static validatePassword(password: string): ValidationResult {
    if (!password || password.length === 0) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_PASSWORD_REQUIRED',
          'Password is required',
          'general',
          false
        )
      };
    }

    if (password.length < 6) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_PASSWORD_TOO_SHORT',
          'Password must be at least 6 characters long',
          'general',
          false
        )
      };
    }

    if (!/(?=.*[a-z])/.test(password)) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_PASSWORD_NO_LOWERCASE',
          'Password must contain at least one lowercase letter',
          'general',
          false
        )
      };
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_PASSWORD_NO_UPPERCASE',
          'Password must contain at least one uppercase letter',
          'general',
          false
        )
      };
    }

    if (!/(?=.*\d)/.test(password)) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_PASSWORD_NO_NUMBER',
          'Password must contain at least one number',
          'general',
          false
        )
      };
    }

    return { isValid: true };
  }

  // Display name validation
  static validateDisplayName(displayName: string): ValidationResult {
    if (!displayName || displayName.trim().length === 0) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_DISPLAY_NAME_REQUIRED',
          'Display name is required',
          'general',
          false
        )
      };
    }

    if (displayName.trim().length < 2) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_DISPLAY_NAME_TOO_SHORT',
          'Display name must be at least 2 characters long',
          'general',
          false
        )
      };
    }

    if (displayName.trim().length > 50) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_DISPLAY_NAME_TOO_LONG',
          'Display name must be less than 50 characters',
          'general',
          false
        )
      };
    }

    // Check for invalid characters
    const validNameRegex = /^[a-zA-Z0-9\s\-_.]+$/;
    if (!validNameRegex.test(displayName.trim())) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_DISPLAY_NAME_INVALID_CHARS',
          'Display name can only contain letters, numbers, spaces, hyphens, underscores, and periods',
          'general',
          false
        )
      };
    }

    return { isValid: true };
  }

  // Validate all sign up fields at once
  static validateSignUpForm(
    email: string,
    password: string,
    displayName: string
  ): ValidationResult {
    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      return emailValidation;
    }

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.isValid) {
      return passwordValidation;
    }

    const displayNameValidation = this.validateDisplayName(displayName);
    if (!displayNameValidation.isValid) {
      return displayNameValidation;
    }

    return { isValid: true };
  }

  // Validate sign in fields
  static validateSignInForm(email: string, password: string): ValidationResult {
    if (!email || email.trim().length === 0) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_EMAIL_REQUIRED',
          'Email address is required',
          'general',
          false
        )
      };
    }

    if (!password || password.length === 0) {
      return {
        isValid: false,
        error: ErrorHandler.createError(
          'VALIDATION_PASSWORD_REQUIRED',
          'Password is required',
          'general',
          false
        )
      };
    }

    // For sign in, we don't need to validate email format strictly
    // as the server will handle that
    return { isValid: true };
  }
}