import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Video } from '../types';

interface ActionButtonsProps {
  video: Video;
  onCommentPress?: (videoId: string) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ video, onCommentPress }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.stats.likes);
  const [likeAnimation] = useState(new Animated.Value(1));

  const handleLike = () => {
    // Animate the like button
    Animated.sequence([
      Animated.timing(likeAnimation, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Update like state
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    if (onCommentPress) {
      onCommentPress(video.id);
    } else {
      console.log('Comment pressed for video:', video.id);
    }
  };

  const handleShare = () => {
    console.log('Share pressed for video:', video.id);
    // TODO: Implement share functionality
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      {/* Like Button */}
      <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
        <Animated.View style={{ transform: [{ scale: likeAnimation }] }}>
          <Text style={[styles.actionIcon, isLiked && styles.likedIcon]}>
            {isLiked ? '❤️' : '🤍'}
          </Text>
        </Animated.View>
        <Text style={styles.actionText}>{formatNumber(likeCount)}</Text>
      </TouchableOpacity>

      {/* Comment Button */}
      <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
        <Text style={styles.actionIcon}>💬</Text>
        <Text style={styles.actionText}>{formatNumber(video.stats.comments)}</Text>
      </TouchableOpacity>

      {/* Share Button */}
      <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
        <Text style={styles.actionIcon}>🔄</Text>
        <Text style={styles.actionText}>{formatNumber(video.stats.shares)}</Text>
      </TouchableOpacity>

      {/* Profile Picture */}
      <TouchableOpacity style={styles.profileButton}>
        <View style={styles.profileContainer}>
          <Text style={styles.profileIcon}>👤</Text>
          {!video.creator.verified && (
            <View style={styles.followButton}>
              <Text style={styles.followText}>+</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  likedIcon: {
    transform: [{ scale: 1.1 }],
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  profileButton: {
    marginTop: 8,
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 40,
    backgroundColor: '#333',
    borderRadius: 25,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  followButton: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: '#ff0050',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  followText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});