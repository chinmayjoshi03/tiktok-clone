import { AppError } from '../utils/errorHandler';

export interface ErrorReport {
  error: AppError;
  context: string;
  timestamp: Date;
  userId?: string;
  deviceInfo?: {
    platform: string;
    version: string;
  };
}

export class ErrorReportingService {
  private static errorQueue: ErrorReport[] = [];
  private static maxQueueSize = 50;

  // Log error for debugging and potential reporting
  static logError(
    error: AppError, 
    context: string, 
    userId?: string
  ): void {
    const errorReport: ErrorReport = {
      error,
      context,
      timestamp: new Date(),
      userId,
      deviceInfo: {
        platform: 'react-native',
        version: '1.0.0',
      },
    };

    // Add to queue
    this.errorQueue.push(errorReport);
    
    // Keep queue size manageable
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Log to console for development
    console.error(`[ERROR REPORT] ${context}:`, {
      code: error.code,
      message: error.message,
      type: error.type,
      recoverable: error.recoverable,
      timestamp: errorReport.timestamp.toISOString(),
      userId,
    });

    // In production, you would send this to your error reporting service
    // this.sendToErrorReportingService(errorReport);
  }

  // Get recent errors for debugging
  static getRecentErrors(limit: number = 10): ErrorReport[] {
    return this.errorQueue.slice(-limit);
  }

  // Clear error queue
  static clearErrorQueue(): void {
    this.errorQueue = [];
  }

  // Get error statistics
  static getErrorStats(): {
    total: number;
    byType: Record<string, number>;
    byCode: Record<string, number>;
  } {
    const stats = {
      total: this.errorQueue.length,
      byType: {} as Record<string, number>,
      byCode: {} as Record<string, number>,
    };

    this.errorQueue.forEach(report => {
      const { type, code } = report.error;
      stats.byType[type] = (stats.byType[type] || 0) + 1;
      stats.byCode[code] = (stats.byCode[code] || 0) + 1;
    });

    return stats;
  }

  // Send to external error reporting service (placeholder)
  private static async sendToErrorReportingService(report: ErrorReport): Promise<void> {
    // In a real app, you would send this to services like:
    // - Sentry
    // - Bugsnag
    // - Firebase Crashlytics
    // - Custom error reporting endpoint
    
    try {
      // Example implementation:
      // await fetch('https://your-error-reporting-endpoint.com/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(report),
      // });
    } catch (error) {
      console.warn('Failed to send error report:', error);
    }
  }
}