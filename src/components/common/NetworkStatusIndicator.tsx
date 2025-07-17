import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { theme, responsive } from '../../styles/utils';

interface NetworkStatusIndicatorProps {
  showWhenOnline?: boolean;
}

export const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({
  showWhenOnline = false,
}) => {
  const networkStatus = useNetworkStatus();
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (!networkStatus.isConnected || (networkStatus.isConnected && showWhenOnline)) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      if (networkStatus.isConnected && showWhenOnline) {
        // Auto-hide the "back online" message after 3 seconds
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 3000);
      }
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [networkStatus.isConnected, showWhenOnline, fadeAnim]);

  if (networkStatus.isConnected && !showWhenOnline) {
    return null;
  }

  const backgroundColor = networkStatus.isConnected 
    ? theme.colors.success || '#4CAF50'
    : theme.colors.error || '#FF3B30';

  const message = networkStatus.isConnected
    ? 'Back online'
    : 'No internet connection';

  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor, opacity: fadeAnim }
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: responsive.fontSize('sm'),
    fontWeight: theme.typography.fontWeights.medium,
    textAlign: 'center',
  },
});