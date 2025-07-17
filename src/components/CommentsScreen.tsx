import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme, responsive, mixins } from '../styles/utils';

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface CommentsScreenProps {
  videoId?: string;
  onClose?: () => void;
}

export default function CommentsScreen({ videoId, onClose }: CommentsScreenProps) {
  const navigation = useNavigation();
  const route = useRoute();
  const routeVideoId = (route.params as any)?.videoId || videoId;
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'user123',
      text: 'This is amazing! 🔥',
      timestamp: '2h',
      likes: 12,
    },
    {
      id: '2',
      username: 'cooluser',
      text: 'Love this content! Keep it up 👏',
      timestamp: '1h',
      likes: 8,
    },
    {
      id: '3',
      username: 'viewer99',
      text: 'How did you do this?',
      timestamp: '45m',
      likes: 3,
    },
  ]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        username: 'currentuser',
        text: commentText.trim(),
        timestamp: 'now',
        likes: 0,
      };
      setComments([newComment, ...comments]);
      setCommentText('');
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <View style={styles.commentAvatar}>
        <Text style={styles.commentAvatarText}>
          {item.username.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUsername}>{item.username}</Text>
          <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <TouchableOpacity 
          style={styles.likeButton}
          onPress={() => handleLikeComment(item.id)}
        >
          <Ionicons name="heart-outline" size={theme.layout.icon.sm} color={theme.colors.text.muted} />
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => onClose ? onClose() : navigation.goBack()} 
            style={styles.closeButton}
          >
            <Ionicons name="close" size={theme.layout.icon.base} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Comments</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Comments List */}
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          style={styles.commentsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.commentsContainer}
        />

        {/* Comment Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a comment..."
            placeholderTextColor={theme.colors.text.muted}
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={200}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              { opacity: commentText.trim() ? 1 : 0.5 }
            ]}
            onPress={handleAddComment}
            disabled={!commentText.trim()}
          >
            <Ionicons name="send" size={theme.layout.icon.base} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[700],
  },
  closeButton: {
    padding: theme.spacing[1],
  },
  headerTitle: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('lg'),
    fontWeight: theme.typography.fontWeights.bold,
  },
  placeholder: {
    width: theme.spacing[8],
  },
  commentsList: {
    flex: 1,
  },
  commentsContainer: {
    paddingVertical: theme.spacing[4],
  },
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
  },
  commentAvatar: {
    ...mixins.avatar('sm'),
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing[3],
  },
  commentAvatarText: {
    color: theme.colors.white,
    fontSize: responsive.fontSize('sm'),
    fontWeight: theme.typography.fontWeights.bold,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[1],
  },
  commentUsername: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('sm'),
    fontWeight: theme.typography.fontWeights.semibold,
    marginRight: theme.spacing[2],
  },
  commentTimestamp: {
    color: theme.colors.text.muted,
    fontSize: responsive.fontSize('xs'),
  },
  commentText: {
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('sm'),
    lineHeight: theme.typography.lineHeights.normal * responsive.fontSize('sm'),
    marginBottom: theme.spacing[2],
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    color: theme.colors.text.muted,
    fontSize: responsive.fontSize('xs'),
    marginLeft: theme.spacing[1],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[700],
    backgroundColor: theme.colors.background.secondary,
  },
  textInput: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize('sm'),
    maxHeight: 100,
    marginRight: theme.spacing[3],
  },
  sendButton: {
    padding: theme.spacing[2],
  },
});