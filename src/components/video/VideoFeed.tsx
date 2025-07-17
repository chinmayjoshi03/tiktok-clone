import React, { useRef, useCallback } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    ViewToken,
    ActivityIndicator,
    Text,
    TouchableOpacity,
} from 'react-native';
import { VideoPlayer } from './VideoPlayer';
import { VideoOverlay } from './VideoOverlay';
import { ActionButtons } from './ActionButtons';
import { useVideo } from '../../contexts/VideoContext';
import { Video } from '../../types';
import { theme, responsive, mixins } from '../../styles/utils';

const { height: screenHeight } = Dimensions.get('window');

interface VideoFeedProps {
    onProfilePress?: (username: string) => void;
    onCommentPress?: (videoId: string) => void;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({
    onProfilePress = () => { },
    onCommentPress = () => { },
}) => {
    const { videos, currentIndex, setCurrentIndex, likeVideo, isLoading, error, retryLoadVideos } = useVideo();
    const flatListRef = useRef<FlatList>(null);

    // Handle viewable items change to determine which video should be playing
    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            const activeItem = viewableItems.find(item => item.isViewable && item.index !== null);
            if (activeItem && activeItem.index !== null) {
                setCurrentIndex(activeItem.index);
            }
        }
    }, [setCurrentIndex]);

    // Configuration for viewability
    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50, // Video is considered viewable when 50% is visible
        minimumViewTime: 300, // Minimum time in ms before considering item viewable
    };

    const handleLike = useCallback(async (videoId: string) => {
        await likeVideo(videoId);
    }, [likeVideo]);

    const handleComment = useCallback((videoId: string) => {
        onCommentPress(videoId);
    }, [onCommentPress]);

    const handleShare = useCallback((videoId: string) => {
        // Placeholder for share functionality
        console.log('Share video:', videoId);
    }, []);

    const handleVideoEnd = useCallback(() => {
        // Video ended, it will loop automatically due to VideoPlayer configuration
        // This is just a placeholder for any additional logic needed
    }, []);

    const renderVideoItem = ({ item, index }: { item: Video; index: number }) => {
        const isActive = index === currentIndex;

        return (
            <View style={styles.videoContainer}>
                {/* Video Player */}
                <VideoPlayer
                    video={item}
                    isActive={isActive}
                    onVideoEnd={handleVideoEnd}
                />

                {/* Video Overlay with creator info and description */}
                <VideoOverlay
                    video={item}
                    onProfilePress={onProfilePress}
                />

                {/* Action Buttons (like, comment, share) */}
                <ActionButtons
                    video={item}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                />
            </View>
        );
    };

    const getItemLayout = useCallback(
        (_data: ArrayLike<Video> | null | undefined, index: number) => ({
            length: screenHeight,
            offset: screenHeight * index,
            index,
        }),
        []
    );

    // Loading state
    if (isLoading && videos.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Loading videos...</Text>
            </View>
        );
    }

    // Error state
    if (error && videos.length === 0) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load videos</Text>
                <Text style={styles.errorSubtext}>{error.message}</Text>
                {error.recoverable && (
                    <TouchableOpacity 
                        style={styles.retryButton} 
                        onPress={() => retryLoadVideos()}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    // Empty state
    if (videos.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No videos available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={videos}
                renderItem={renderVideoItem}
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
                style={styles.flatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    flatList: {
        flex: 1,
    },
    videoContainer: {
        height: screenHeight,
        position: 'relative',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        ...mixins.center,
    },
    loadingText: {
        color: theme.colors.text.primary,
        fontSize: responsive.fontSize('base'),
        marginTop: theme.spacing[4],
        fontWeight: theme.typography.fontWeights.medium,
    },
    errorContainer: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        padding: theme.spacing[5],
        ...mixins.center,
    },
    errorText: {
        color: theme.colors.text.primary,
        fontSize: responsive.fontSize('lg'),
        fontWeight: theme.typography.fontWeights.bold,
        textAlign: 'center',
        marginBottom: theme.spacing[2],
    },
    errorSubtext: {
        color: theme.colors.text.muted,
        fontSize: responsive.fontSize('sm'),
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        ...mixins.center,
    },
    emptyText: {
        color: theme.colors.text.primary,
        fontSize: responsive.fontSize('base'),
        fontWeight: theme.typography.fontWeights.medium,
    },
    retryButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing[6],
        paddingVertical: theme.spacing[3],
        borderRadius: theme.spacing[2],
        marginTop: theme.spacing[4],
    },
    retryButtonText: {
        color: theme.colors.white,
        fontSize: responsive.fontSize('base'),
        fontWeight: theme.typography.fontWeights.bold,
        textAlign: 'center',
    },
});