import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Dimensions, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { VideoPlayerProps } from '../../types';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorHandler } from '../../utils/errorHandler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isActive,
  onVideoEnd
}) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle video playback based on isActive prop
  useEffect(() => {
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

  const handleVideoPress = async () => {
    if (!videoRef.current || hasError) return;

    try {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling video playback:', error);
    }
  };

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setIsLoading(false);
      setHasError(false);
      
      // Handle video end
      if (status.didJustFinish) {
        onVideoEnd?.();
      }
    } else if (status.error) {
      setIsLoading(false);
      setHasError(true);
      console.error('Video playback error:', status.error);
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleError = (error: string) => {
    setIsLoading(false);
    setHasError(true);
    console.error('Video loading error:', error);
  };

  return (
    <TouchableWithoutFeedback onPress={handleVideoPress}>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: video.url }}
          style={styles.video}
          shouldPlay={isActive}
          isLooping={true}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onLoadStart={handleLoadStart}
          onError={handleError}
          useNativeControls={false}
        />
        
        {/* Loading indicator overlay */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <LoadingSpinner 
              size="large" 
              color="#FFFFFF" 
              message="Loading video..." 
            />
          </View>
        )}
        
        {/* Error overlay */}
        {hasError && (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>Failed to load video</Text>
            <Text style={styles.errorSubtext}>Tap to retry or swipe to next video</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
  },
});