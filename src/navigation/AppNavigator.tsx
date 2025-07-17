import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// Import screens (we'll create these next)
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  // Show loading screen while checking authentication state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner
          size="large"
          message="Loading..."
          color="#0000ff"
        />
      </View>
    );
  }

  // Show different navigation based on authentication state
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // User is signed in, show main app
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        // User is not signed in, show auth screens
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});