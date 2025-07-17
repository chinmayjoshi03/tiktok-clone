import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Video } from '../types';

interface VideoOverlayProps {
  video: Video;
}

export const VideoOverlay: React.FC<VideoOverlayProps> = ({ video }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.bottomContent}>
        {/* Creator info */}
        <View style={styles.creatorSection}>
          <Image source={{ uri: video.creator.avatar }} style={styles.avatar} />
          <View style={styles.creatorInfo}>
            <Text style={styles.username}>
              @{video.creator.username}
              {video.creator.verified && <Text style={styles.verified}> ✓</Text>}
            </Text>
          </View>
        </View>

        {/* Video description */}
        <Text style={styles.description} numberOfLines={3}>
          {video.description}
        </Text>

        {/* Music info */}
        {video.music && (
          <View style={styles.musicSection}>
            <Text style={styles.musicText}>
              🎵 {video.music.title} - {video.music.artist}
            </Text>
          </View>
        )}

        {/* Video stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statText}>❤️ {video.stats.likes}</Text>
          <Text style={styles.statText}>💬 {video.stats.comments}</Text>
          <Text style={styles.statText}>🔄 {video.stats.shares}</Text>
          {video.stats.views && (
            <Text style={styles.statText}>👁️ {video.stats.views}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  bottomContent: {
    paddingBottom: 20,
  },
  creatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  creatorInfo: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  verified: {
    color: '#1DA1F2',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  musicSection: {
    marginBottom: 16,
  },
  musicText: {
    color: '#fff',
    fontSize: 12,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 16,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});