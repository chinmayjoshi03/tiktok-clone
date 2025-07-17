import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme, responsive, mixins } from '../../styles/utils';

interface ProfilePictureProps {
  uri?: string;
  name?: string;
  size?: keyof typeof theme.layout.avatar;
  style?: ViewStyle;
  showBorder?: boolean;
  borderColor?: string;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  uri,
  name = 'U',
  size = 'base',
  style,
  showBorder = false,
  borderColor = theme.colors.white,
}) => {
  const avatarSize = theme.layout.avatar[size];
  const fontSize = size === 'sm' ? 'xs' : 
                   size === 'lg' ? 'lg' : 
                   size === 'xl' ? 'xl' : 
                   size === '2xl' ? '2xl' : 'base';

  const containerStyle = [
    mixins.avatar(size),
    showBorder && {
      borderWidth: 2,
      borderColor,
      ...theme.shadows.sm,
    },
    style,
  ];

  const getInitials = (displayName: string) => {
    return displayName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={containerStyle}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.initials, { fontSize: responsive.fontSize(fontSize) }]}>
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  initials: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeights.bold,
    textAlign: 'center',
  },
});