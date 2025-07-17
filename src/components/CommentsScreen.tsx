import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
  id: string;
  text: string;
  author: {
    username: string;
    avatar: string;
  };
  timestamp: Date;
  likes: number;
}

interface CommentsScreenProps {
  route: {
    params: {
      videoId: string;
    };
  };
  navigation: any;
}

export default function CommentsScreen({ route, navigation }: CommentsScreenProps) {
  const { videoId } = route.params;
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      text: 'This is amazing! 🔥',
      author: {
        username: 'user123',
        avatar: 'https://picsum.photos/100/100?random=10',
      },
      timestamp: new Date('2024-01-15T10:30:00Z'),
      likes: 12,
    },
    {
      id: '2',
      text: 'Love this content! Keep it up 👏',
      author: {
        username: 'cooluser',
        avatar: 'https://picsum.photos/100/100?random=11',
      },
      timestamp: new Date('2024-01-15T11:15:00Z'),
      likes: 8,
    },
    {
      id: '3',
      text: 'How did you do this? Tutorial please!',
      author: {
        username: 'learner_99',
        avatar: 'https://picsum.photos/100/100?random=12',
      },
      timestamp: new Date('2024-01-15T12:00:00Z'),
      likes: 5,
    },
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment.trim(),
        author: {
          username: user?.email?.split('@')[0] || 'You',
          avatar: 'https://picsum.photos/100/100?random=99',
        },
        timestamp: new Date(),
        likes: 0,
      };

      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: item.author.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUsername}>{item.author.username}</Text>
          <Text style={styles.commentTime}>{formatTimeAgo(item.timestamp)}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleLikeComment(item.id)}
        >
          <Text style={styles.likeText}>❤️ {item.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>✕</Text>
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
      />

      {/* Add Comment Input */}
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/100/100?random=99' }}
          style={styles.userAvatar}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Add a comment..."
          placeholderTextColor="#666"
          value={newComment}
          onChangeText={setNewComment}
          multiline
          maxLength={200}
        />
        <TouchableOpacity
          style={[styles.sendButton, !newComment.trim() && styles.sendButtonDisabled]}
          onPress={handleAddComment}
          disabled={!newComment.trim()}
        >
          <Text style={styles.sendButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 24,
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  commentItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 8,
  },
  likeButton: {
    alignSelf: 'flex-start',
  },
  likeText: {
    fontSize: 12,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#000',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#fff',
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#ff0050',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#333',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});