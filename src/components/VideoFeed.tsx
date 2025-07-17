import React, { useRef, useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ViewToken } from 'react-native';
import { dummyVideos } from '../data/dummyVideos';
import { Video } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { VideoOverlay } from './VideoOverlay';
import { ActionButtons } from './ActionButtons';

const { height: screenHeight } = Dimensions.get('window');

interface VideoItemProps {
  video: Video;
  isActive: boolean;
  onCommentPress?: (videoId: string) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, isActive, onCommentPress }) => {
  return (
    <View style={styles.videoContainer}>
      <VideoPlayer video={video} isActive={isActive} />
      <VideoOverlay video={video} />
      <ActionButtons video={video} onCommentPress={onCommentPress} />
    </View>
  );
};

interface VideoFeedProps {
  onCommentPress?: (videoId: string) => void;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ onCommentPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Handle viewable items change to determine which video should be playing
  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const activeItem = viewableItems.find(item => item.isViewable && item.index !== null);
      if (activeItem && activeItem.index !== null) {
        setCurrentIndex(activeItem.index);
      }
    }
  }, []);

  // Configuration for viewability
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Video is considered viewable when 50% is visible
    minimumViewTime: 300, // Minimum time in ms before considering item viewable
  };

  const renderVideo = ({ item, index }: { item: Video; index: number }) => (
    <VideoItem video={item} isActive={index === currentIndex} onCommentPress={onCommentPress} />
  );

  const getItemLayout = useCallback(
    (_data: ArrayLike<Video> | null | undefined, index: number) => ({
      length: screenHeight,
      offset: screenHeight * index,
      index,
    }),
    []
  );

  return (
    <FlatList
      ref={flatListRef}
      data={dummyVideos}
      renderItem={renderVideo}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={screenHeight}
      snapToAlignment="start"
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={3}
      windowSize={5}
      initialNumToRender={2}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height: screenHeight,
    position: 'relative',
  },
});