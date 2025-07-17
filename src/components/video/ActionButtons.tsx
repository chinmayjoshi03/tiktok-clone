import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButtonsProps } from '../../types';
import { theme, responsive, mixins, utils } from '../../styles/utils';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  video,
  onLike,
  onComment,
  onShare
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeAnimation] = useState(new Animated.Value(1));

  const formatNumber = utils.formatNumber;

  const handleLike = async () => {
    // Add haptic feedback
    utils.hapticFeedback('medium');
    
    // Animate the like button with improved timing
    Animated.sequence([
      Animated.timing(likeAnimation, {
        toValue: 1.3,
        duration: theme.animations.timing.fast,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 1,
        duration: theme.animations.timing.fast,
        useNativeDriver: true,
      }),
    ]).start();

    setIsLiked(!isLiked);
    await onLike(video.id);
  };

  const animatedStyle = {
    transform: [{ scale: likeAnimation }]
  };

  const handleComment = () => {
    onComment(video.id);
  };

  const handleShare = () => {
    onShare(video.id);
  };

  return (
    <View style={styles.container}>
      {/* Like Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleLike}
        activeOpacity={0.7}
      >
        <Animated.View style={animatedStyle}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={theme.layout.icon.lg}
            color={isLiked ? theme.colors.like : theme.colors.text.primary}
          />
        </Animated.View>
        <Text style={styles.actionText}>
          {formatNumber(video.stats.likes + (isLiked ? 1 : 0))}
        </Text>
      </TouchableOpacity>

      {/* Comment Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleComment}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chatbubble-outline"
          size={theme.layout.icon.lg}
          color={theme.colors.comment}
        />
        <Text style={styles.actionText}>
          {formatNumber(video.stats.comments)}
        </Text>
      </TouchableOpacity>

      {/* Share Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleShare}
        activeOpacity={0.7}
      >
        <Ionicons
          name="share-outline"
          size={theme.layout.icon.lg}
          color={theme.colors.share}
        />
        <Text style={styles.actionText}>
          {formatNumber(video.stats.shares)}
        </Text>
      </TouchableOpacity>

      {/* Creator Avatar (as additional action) */}
      <TouchableOpacity
        style={[styles.actionButton, styles.avatarButton]}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <Ionicons
            name="person-circle"
            size={theme.layout.avatar.lg}
            color={theme.colors.text.primary}
          />
          <View style={styles.followButton}>
            <Ionicons
              name="add"
              size={theme.layout.icon.sm}
              color={theme.colors.white}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: theme.spacing[4],
    bottom: theme.layout.video.bottomSafeArea + theme.spacing[5],
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: theme.layout.video.actionButtonSpacing,
    minHeight: theme.layout.video.actionButtonSize,
    minWidth: theme.layout.video.actionButtonSize,
    ...mixins.center,
  },
  actionText: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('xs'),
    fontWeight: theme.typography.fontWeights.semibold,
    marginTop: theme.spacing[1],
    textAlign: 'center',
    textShadowColor: theme.colors.background.overlayDark,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  avatarButton: {
    marginTop: theme.spacing[2],
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  followButton: {
    position: 'absolute',
    bottom: -theme.spacing[1],
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    width: theme.spacing[6],
    height: theme.spacing[6],
    ...mixins.center,
    borderWidth: 2,
    borderColor: theme.colors.white,
    ...theme.shadows.sm,
  },
});