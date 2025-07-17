import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function UploadScreen() {
  const uploadOptions = [
    { icon: '📹', title: 'Record Video', subtitle: 'Create a new video' },
    { icon: '📱', title: 'Upload from Gallery', subtitle: 'Choose from your photos' },
    { icon: '🎵', title: 'Add Sound', subtitle: 'Browse trending sounds' },
    { icon: '✨', title: 'Use Template', subtitle: 'Try trending templates' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mainSection}>
          <View style={styles.recordButton}>
            <View style={styles.recordButtonInner}>
              <Text style={styles.recordIcon}>📹</Text>
            </View>
          </View>
          <Text style={styles.recordText}>Tap to record</Text>
          <Text style={styles.recordSubtext}>Hold for video, tap for photo</Text>
        </View>

        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {uploadOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionItem}>
              <View style={styles.optionIcon}>
                <Text style={styles.optionEmoji}>{option.icon}</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips for great content</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>Keep videos under 60 seconds for better engagement</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🎯</Text>
            <Text style={styles.tipText}>Use trending sounds and hashtags</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>⚡</Text>
            <Text style={styles.tipText}>Post consistently to grow your audience</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
  content: {
    flex: 1,
  },
  mainSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff0050',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordIcon: {
    fontSize: 24,
  },
  recordText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordSubtext: {
    color: '#666',
    fontSize: 14,
  },
  optionsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionEmoji: {
    fontSize: 18,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  optionArrow: {
    color: '#666',
    fontSize: 20,
  },
  tipsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});