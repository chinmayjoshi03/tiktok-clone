import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { theme, responsive, mixins } from '../../styles/utils';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  overlay?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = theme.colors.primary,
  message,
  overlay = false,
}) => {
  const containerStyle = overlay ? [styles.container, styles.overlay] : styles.container;

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...mixins.center,
    padding: theme.spacing[5],
  },
  overlay: {
    ...mixins.absoluteFill,
    backgroundColor: theme.colors.background.overlay,
    zIndex: 1000,
  },
  message: {
    marginTop: theme.spacing[3],
    fontSize: responsive.fontSize('base'),
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeights.medium,
  },
});