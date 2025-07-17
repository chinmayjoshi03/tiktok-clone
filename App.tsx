import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { VideoFeed } from './src/components/VideoFeed';
import LoginScreen from './src/components/auth/LoginScreen';
import SignUpScreen from './src/components/auth/SignUpScreen';
import ProfileScreen from './src/components/ProfileScreen';
import CommentsScreen from './src/components/CommentsScreen';
import DiscoverScreen from './src/components/DiscoverScreen';
import UploadScreen from './src/components/UploadScreen';
import NotificationsScreen from './src/components/NotificationsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }: any) {
  const handleCommentPress = (videoId: string) => {
    navigation.navigate('Comments', { videoId });
  };

  return (
    <View style={styles.container}>
      <VideoFeed onCommentPress={handleCommentPress} />
      <StatusBar style="light" />
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VideoFeed" component={HomeScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#333',
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#ff0050',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 24 : 20 }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 24 : 20 }}>🔍</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Upload" 
        component={UploadScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.uploadButton, focused && styles.uploadButtonActive]}>
              <Text style={styles.uploadIcon}>+</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 24 : 20 }}>💬</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 24 : 20 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  uploadButton: {
    width: 45,
    height: 32,
    backgroundColor: '#ff0050',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  uploadButtonActive: {
    backgroundColor: '#ff3366',
  },
  uploadIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});