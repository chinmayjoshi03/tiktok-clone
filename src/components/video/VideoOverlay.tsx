import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VideoOverlayProps } from '../../types';
import { theme, responsive, mixins, utils } from '../../styles/utils';

export const VideoOverlay: React.FC<VideoOverlayProps> = ({
  video,
  onProfilePress
}) => {
  const handleProfilePress = () => {
    onProfilePress(video.creator.username);
  };

  const formatNumber = utils.formatNumber;

  return (
    <View style={styles.overlay}>
      {/* Bottom content area */}
      <View style={styles.bottomContent}>
        {/* Creator info */}
        <TouchableOpacity 
          style={styles.creatorSection}
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          <Image 
            source={{ uri: video.creator.avatar }} 
            style={styles.avatar}
          />
          <View style={styles.creatorInfo}>
            <View style={styles.usernameRow}>
              <Text style={styles.username}>@{video.creator.username}</Text>
              {video.creator.verified && (
                <Ionicons 
                  name="checkmark-circle" 
                  size={theme.layout.icon.sm} 
                  color={theme.colors.verified} 
                  style={styles.verifiedIcon}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Video description */}
        <Text style={styles.description} numberOfLines={3}>
          {video.description}
        </Text>

        {/* Music info */}
        {video.music && (
          <View style={styles.musicSection}>
            <Ionicons name="musical-notes" size={theme.layout.icon.sm} color={theme.colors.text.primary} />
            <Text style={styles.musicText} numberOfLines={1}>
              {video.music.title} - {video.music.artist}
            </Text>
          </View>
        )}

        {/* Video stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={theme.layout.icon.sm} color={theme.colors.like} />
            <Text style={styles.statText}>{formatNumber(video.stats.likes)}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="chatbubble" size={theme.layout.icon.sm} color={theme.colors.text.primary} />
            <Text style={styles.statText}>{formatNumber(video.stats.comments)}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="share" size={theme.layout.icon.sm} color={theme.colors.text.primary} />
            <Text style={styles.statText}>{formatNumber(video.stats.shares)}</Text>
          </View>
          
          {video.stats.views && (
            <View style={styles.statItem}>
              <Ionicons name="eye" size={theme.layout.icon.sm} color={theme.colors.text.primary} />
              <Text style={styles.statText}>{formatNumber(video.stats.views)}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...mixins.absoluteFill,
    justifyContent: 'flex-end',
    paddingHorizontal: theme.layout.video.overlayPadding,
    paddingBottom: theme.layout.video.bottomSafeArea,
  },
  bottomContent: {
    paddingBottom: theme.spacing[5],
  },
  creatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  avatar: {
    ...mixins.avatar('base'),
    marginRight: theme.spacing[3],
    borderWidth: 2,
    borderColor: theme.colors.white,
    ...theme.shadows.sm,
  },
  creatorInfo: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('base'),
    fontWeight: theme.typography.fontWeights.semibold,
    textShadowColor: theme.colors.background.overlayDark,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  verifiedIcon: {
    marginLeft: theme.spacing[1],
  },
  description: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('sm'),
    lineHeight: theme.typography.lineHeights.normal * responsive.fontSize('sm'),
    marginBottom: theme.spacing[3],
    textShadowColor: theme.colors.background.overlayDark,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  musicSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
    backgroundColor: theme.colors.background.overlayLight,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    ...theme.shadows.sm,
  },
  musicText: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('xs'),
    marginLeft: theme.spacing[2],
    fontStyle: 'italic',
    fontWeight: theme.typography.fontWeights.medium,
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing[5],
    marginBottom: theme.spacing[1],
  },
  statText: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('xs'),
    marginLeft: theme.spacing[1],
    fontWeight: theme.typography.fontWeights.medium,
    textShadowColor: theme.colors.background.overlayDark,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});