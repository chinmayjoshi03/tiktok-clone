import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme, responsive, mixins, utils } from '../../styles/utils';
import { createScaleAnimation } from '../../styles/animations';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'base',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  fullWidth = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled && !loading) {
      utils.hapticFeedback('light');
      createScaleAnimation(scaleAnim, 0.95).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: theme.animations.timing.fast,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle = mixins.button[variant];
    const sizeStyle = {
      minHeight: theme.layout.button.height[size],
      paddingVertical: size === 'sm' ? theme.spacing[2] : size === 'lg' ? theme.spacing[4] : theme.spacing[3],
    };
    
    const styles: ViewStyle[] = [baseStyle, sizeStyle];
    
    if (fullWidth) {
      styles.push({ width: '100%' as any });
    }
    
    if (disabled || loading) {
      styles.push({ opacity: 0.6 });
    }
    
    if (style) {
      styles.push(style);
    }
    
    return styles;
  };

  const getTextStyle = () => {
    const fontSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base';
    const color = variant === 'primary' ? theme.colors.white : 
                  variant === 'secondary' ? theme.colors.text.primary : 
                  theme.colors.text.primary;
    
    return [
      {
        fontSize: responsive.fontSize(fontSize),
        fontWeight: theme.typography.fontWeights.bold,
        color,
      },
      textStyle,
    ];
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' ? theme.colors.white : theme.colors.primary} 
          />
        ) : (
          <>
            {icon}
            <Text style={getTextStyle()}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6,
  },
});