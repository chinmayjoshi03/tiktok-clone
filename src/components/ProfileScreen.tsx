import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { theme, responsive, mixins } from '../styles/utils';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.displayName}>
          {user?.displayName || 'User'}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing[5],
  },
  profileSection: {
    alignItems: 'center',
    marginTop: theme.spacing[10],
    marginBottom: theme.spacing[10],
  },
  avatar: {
    ...mixins.avatar('2xl'),
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing[4],
    ...theme.shadows.md,
  },
  avatarText: {
    fontSize: responsive.fontSize('3xl'),
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.white,
  },
  displayName: {
    fontSize: responsive.fontSize('2xl'),
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  email: {
    fontSize: responsive.fontSize('base'),
    color: theme.colors.text.muted,
    fontWeight: theme.typography.fontWeights.medium,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing[10],
    paddingVertical: theme.spacing[5],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[700],
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: responsive.fontSize('xl'),
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  statLabel: {
    fontSize: responsive.fontSize('sm'),
    color: theme.colors.text.muted,
    fontWeight: theme.typography.fontWeights.medium,
  },
  signOutButton: {
    ...mixins.button.secondary,
    marginTop: theme.spacing[5],
    width: '100%',
  },
  signOutButtonText: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('base'),
    fontWeight: theme.typography.fontWeights.bold,
  },
});