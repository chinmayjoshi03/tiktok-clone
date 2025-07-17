import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function DiscoverScreen() {
  const trendingHashtags = [
    { tag: '#dance', views: '2.1B' },
    { tag: '#comedy', views: '1.8B' },
    { tag: '#food', views: '1.5B' },
    { tag: '#pets', views: '1.2B' },
    { tag: '#travel', views: '980M' },
    { tag: '#diy', views: '750M' },
  ];

  const trendingSounds = [
    { name: 'Original Sound - @user123', uses: '125K' },
    { name: 'Trending Beat Mix', uses: '98K' },
    { name: 'Viral Dance Track', uses: '87K' },
    { name: 'Comedy Sound Effect', uses: '76K' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search users, sounds, hashtags</Text>
        </View>
      </View>

      {/* Trending Hashtags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Hashtags</Text>
        {trendingHashtags.map((item, index) => (
          <TouchableOpacity key={index} style={styles.trendingItem}>
            <View style={styles.hashtagIcon}>
              <Text style={styles.hashtagText}>#</Text>
            </View>
            <View style={styles.trendingContent}>
              <Text style={styles.trendingName}>{item.tag}</Text>
              <Text style={styles.trendingViews}>{item.views} views</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trending Sounds */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Sounds</Text>
        {trendingSounds.map((item, index) => (
          <TouchableOpacity key={index} style={styles.trendingItem}>
            <View style={styles.soundIcon}>
              <Text style={styles.soundText}>🎵</Text>
            </View>
            <View style={styles.trendingContent}>
              <Text style={styles.trendingName}>{item.name}</Text>
              <Text style={styles.trendingViews}>{item.uses} videos</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  hashtagIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ff0050',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  hashtagText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  soundIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  soundText: {
    fontSize: 18,
  },
  trendingContent: {
    flex: 1,
  },
  trendingName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  trendingViews: {
    color: '#666',
    fontSize: 14,
  },
});