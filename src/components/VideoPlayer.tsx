import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Video as VideoType } from '../types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface VideoPlayerProps {
  video: VideoType;
  isActive: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isActive }) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(isActive);

  const togglePlayback = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  React.useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.playAsync();
        setIsPlaying(true);
      } else {
        videoRef.current.pauseAsync();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  return (
    <TouchableOpacity style={styles.container} onPress={togglePlayback} activeOpacity={1}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: video.url }}
        shouldPlay={isActive}
        isLooping
        resizeMode="cover"
        volume={1.0}
        isMuted={false}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});