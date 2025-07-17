import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VideoFeed } from './video/VideoFeed';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleProfilePress = (username: string) => {
    // Navigate to profile tab when creator is tapped
    navigation.navigate('Profile' as never);
  };

  const handleCommentPress = (videoId: string) => {
    // Navigate to comments screen
    (navigation as any).navigate('Comments', { videoId });
  };

  return (
    <View style={styles.container}>
      <VideoFeed
        onProfilePress={handleProfilePress}
        onCommentPress={handleCommentPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});