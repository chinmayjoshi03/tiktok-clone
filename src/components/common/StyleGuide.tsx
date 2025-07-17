import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { theme, responsive, mixins } from '../../styles/utils';
import { Button } from './Button';
import { ProfilePicture } from './ProfilePicture';
import { LoadingSpinner } from './LoadingSpinner';

// This component showcases our design system and theming
export const StyleGuide: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>TikTok Clone Design System</Text>
      
      {/* Colors Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colors</Text>
        <View style={styles.colorGrid}>
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.colorLabel}>Primary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.secondary }]}>
            <Text style={styles.colorLabel}>Secondary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.background.secondary }]}>
            <Text style={styles.colorLabel}>Background</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.success }]}>
            <Text style={styles.colorLabel}>Success</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.error }]}>
            <Text style={styles.colorLabel}>Error</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.warning }]}>
            <Text style={styles.colorLabel}>Warning</Text>
          </View>
        </View>
      </View>

      {/* Typography Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typography</Text>
        <Text style={[styles.text, { fontSize: responsive.fontSize('5xl') }]}>Heading 1</Text>
        <Text style={[styles.text, { fontSize: responsive.fontSize('4xl') }]}>Heading 2</Text>
        <Text style={[styles.text, { fontSize: responsive.fontSize('3xl') }]}>Heading 3</Text>
        <Text style={[styles.text, { fontSize: responsive.fontSize('2xl') }]}>Heading 4</Text>
        <Text style={[styles.text, { fontSize: responsive.fontSize('xl') }]}>Heading 5</Text>
        <Text style={[styles.text, { fontSize: responsive.fontSize('lg') }]}>Large Text</Text>
        <Text style={[styles.text, { fontSize: responsive.fontSize('base') }]}>Body Text</Text>
        <Text style={[styles.text, { fontSize: responsive.fontSize('sm') }]}>Small Text</Text>
        <Text style={[styles.text, { fontSize: responsive.fontSize('xs') }]}>Extra Small</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons</Text>
        <View style={styles.buttonGrid}>
          <Button title="Primary" onPress={() => {}} variant="primary" />
          <Button title="Secondary" onPress={() => {}} variant="secondary" />
          <Button title="Ghost" onPress={() => {}} variant="ghost" />
          <Button title="Small" onPress={() => {}} size="sm" />
          <Button title="Large" onPress={() => {}} size="lg" />
          <Button title="Loading" onPress={() => {}} loading />
          <Button title="Disabled" onPress={() => {}} disabled />
        </View>
      </View>

      {/* Avatars Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avatars</Text>
        <View style={styles.avatarGrid}>
          <ProfilePicture name="John Doe" size="sm" />
          <ProfilePicture name="Jane Smith" size="base" />
          <ProfilePicture name="Bob Wilson" size="lg" />
          <ProfilePicture name="Alice Brown" size="xl" />
          <ProfilePicture name="Charlie Davis" size="2xl" />
        </View>
      </View>

      {/* Loading States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading States</Text>
        <View style={styles.loadingGrid}>
          <LoadingSpinner size="small" message="Small Spinner" />
          <LoadingSpinner size="large" message="Large Spinner" />
        </View>
      </View>

      {/* Spacing Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spacing System</Text>
        {Object.entries(theme.spacing).map(([key, value]) => (
          <View key={key} style={styles.spacingItem}>
            <View style={[styles.spacingBox, { width: value, height: value }]} />
            <Text style={styles.text}>spacing[{key}] = {value}px</Text>
          </View>
        ))}
      </View>

      {/* Border Radius Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Radius</Text>
        <View style={styles.radiusGrid}>
          {Object.entries(theme.borderRadius).slice(0, 6).map(([key, value]) => (
            <View key={key} style={styles.radiusItem}>
              <View style={[styles.radiusBox, { borderRadius: value }]} />
              <Text style={styles.radiusLabel}>{key}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    padding: theme.spacing[5],
  },
  title: {
    fontSize: responsive.fontSize('4xl'),
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing[8],
  },
  section: {
    marginBottom: theme.spacing[8],
  },
  sectionTitle: {
    fontSize: responsive.fontSize('2xl'),
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[4],
  },
  text: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[3],
  },
  colorSwatch: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    ...mixins.center,
    ...theme.shadows.sm,
  },
  colorLabel: {
    color: theme.colors.white,
    fontSize: responsive.fontSize('xs'),
    fontWeight: theme.typography.fontWeights.bold,
    textAlign: 'center',
  },
  buttonGrid: {
    gap: theme.spacing[3],
  },
  avatarGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  loadingGrid: {
    flexDirection: 'row',
    gap: theme.spacing[8],
    alignItems: 'center',
  },
  spacingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  spacingBox: {
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing[3],
  },
  radiusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[4],
  },
  radiusItem: {
    alignItems: 'center',
  },
  radiusBox: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.secondary,
    marginBottom: theme.spacing[2],
  },
  radiusLabel: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('xs'),
  },
});