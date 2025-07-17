import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: {
    username: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsScreen() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'like',
      user: {
        username: 'dancequeen23',
        avatar: 'https://picsum.photos/100/100?random=20',
      },
      message: 'liked your video',
      timestamp: '2m',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      user: {
        username: 'cooluser',
        avatar: 'https://picsum.photos/100/100?random=21',
      },
      message: 'commented: "This is amazing! 🔥"',
      timestamp: '5m',
      read: false,
    },
    {
      id: '3',
      type: 'follow',
      user: {
        username: 'newuser123',
        avatar: 'https://picsum.photos/100/100?random=22',
      },
      message: 'started following you',
      timestamp: '1h',
      read: true,
    },
    {
      id: '4',
      type: 'mention',
      user: {
        username: 'friend_user',
        avatar: 'https://picsum.photos/100/100?random=23',
      },
      message: 'mentioned you in a comment',
      timestamp: '2h',
      read: true,
    },
    {
      id: '5',
      type: 'like',
      user: {
        username: 'video_lover',
        avatar: 'https://picsum.photos/100/100?random=24',
      },
      message: 'liked your video',
      timestamp: '3h',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👤';
      case 'mention': return '📢';
      default: return '🔔';
    }
  };

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity 
      key={notification.id} 
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification
      ]}
    >
      <Image 
        source={{ uri: notification.user.avatar }} 
        style={styles.avatar} 
      />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{notification.user.username}</Text>
          <Text style={styles.message}> {notification.message}</Text>
        </Text>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </View>
      <View style={styles.notificationIcon}>
        <Text style={styles.iconText}>{getNotificationIcon(notification.type)}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>
          {notifications.map(renderNotification)}
        </View>

        <View style={styles.emptySection}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyText}>You're all caught up!</Text>
          <Text style={styles.emptySubtext}>New notifications will appear here</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  unreadBadge: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#ff0050',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: '#0a0a0a',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 2,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
  },
  message: {
    color: '#ccc',
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  notificationIcon: {
    marginLeft: 8,
  },
  iconText: {
    fontSize: 16,
  },
  unreadDot: {
    position: 'absolute',
    right: 8,
    top: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff0050',
  },
  emptySection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
});