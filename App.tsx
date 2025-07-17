import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { VideoProvider } from './src/contexts/VideoContext';
import { AppStateProvider } from './src/contexts/AppStateContext';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';
import { NetworkStatusIndicator } from './src/components/common/NetworkStatusIndicator';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ErrorBoundary>
      <AppStateProvider>
        <AuthProvider>
          <VideoProvider>
            <View style={styles.container}>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
              <NetworkStatusIndicator showWhenOnline={true} />
            </View>
          </VideoProvider>
        </AuthProvider>
      </AppStateProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});