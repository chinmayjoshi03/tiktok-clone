import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { StorageService } from '../services/storage';
import { ErrorHandler } from '../utils/errorHandler';

export interface AppLifecycleState {
    appState: AppStateStatus;
    isActive: boolean;
    isBackground: boolean;
    isInactive: boolean;
    timeInBackground: number;
    lastActiveTime: number;
}

export const useAppLifecycle = () => {
    const [lifecycleState, setLifecycleState] = useState<AppLifecycleState>({
        appState: AppState.currentState,
        isActive: AppState.currentState === 'active',
        isBackground: AppState.currentState === 'background',
        isInactive: AppState.currentState === 'inactive',
        timeInBackground: 0,
        lastActiveTime: Date.now(),
    });

    const backgroundTimeRef = useRef<number>(0);
    const backgroundStartRef = useRef<number>(0);

    useEffect(() => {
        const handleAppStateChange = async (nextAppState: AppStateStatus) => {
            const now = Date.now();

            try {
                // Calculate time in background
                if (lifecycleState.appState === 'background' && nextAppState === 'active') {
                    const timeInBg = now - backgroundStartRef.current;
                    backgroundTimeRef.current = timeInBg;
                }

                // Track when app goes to background
                if (nextAppState === 'background') {
                    backgroundStartRef.current = now;
                    // Save current app state when going to background
                    await StorageService.saveAppState({
                        lastActiveTime: now,
                    });
                }

                // Update lifecycle state
                setLifecycleState({
                    appState: nextAppState,
                    isActive: nextAppState === 'active',
                    isBackground: nextAppState === 'background',
                    isInactive: nextAppState === 'inactive',
                    timeInBackground: backgroundTimeRef.current,
                    lastActiveTime: nextAppState === 'active' ? now : lifecycleState.lastActiveTime,
                });

            } catch (error) {
                ErrorHandler.logError(
                    ErrorHandler.createError('LIFECYCLE_ERROR', 'Failed to handle app state change', 'general', false),
                    'useAppLifecycle.handleAppStateChange'
                );
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription?.remove();
        };
    }, [lifecycleState.appState, lifecycleState.lastActiveTime]);

    // Restore app state on mount
    useEffect(() => {
        const restoreAppState = async () => {
            try {
                const savedState = await StorageService.getAppState();
                const now = Date.now();
                const timeSinceLastActive = now - savedState.lastActiveTime;

                setLifecycleState(prev => ({
                    ...prev,
                    lastActiveTime: savedState.lastActiveTime,
                    timeInBackground: timeSinceLastActive,
                }));
            } catch (error) {
                ErrorHandler.logError(
                    ErrorHandler.createError('LIFECYCLE_ERROR', 'Failed to restore app state', 'general', false),
                    'useAppLifecycle.restoreAppState'
                );
            }
        };

        restoreAppState();
    }, []);

    return lifecycleState;
};