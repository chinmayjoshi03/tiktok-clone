import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { ValidationService } from '../../utils/validation';
import { theme, responsive, mixins, utils } from '../../styles/utils';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signIn, loading, error, clearError, retryLastOperation } = useAuth();

  const handleLogin = async () => {
    // Validate form inputs
    const validation = ValidationService.validateSignInForm(email, password);
    if (!validation.isValid && validation.error) {
      Alert.alert('Validation Error', validation.error.message);
      return;
    }

    try {
      await signIn(email, password);
      // Navigation will happen automatically due to auth state change
    } catch (error: any) {
      // Error is already handled by AuthContext and stored in context state
      // We can show additional UI feedback here if needed
    }
  };

  const handleRetry = () => {
    clearError();
    retryLastOperation();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.text.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.text.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error.message}</Text>
            {error.recoverable && (
              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.linkText}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    flex: 1,
    ...mixins.center,
    paddingHorizontal: theme.spacing[8],
  },
  title: {
    fontSize: responsive.fontSize('4xl'),
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing[3],
  },
  subtitle: {
    fontSize: responsive.fontSize('base'),
    color: theme.colors.text.muted,
    textAlign: 'center',
    marginBottom: theme.spacing[10],
    fontWeight: theme.typography.fontWeights.medium,
  },
  input: {
    ...mixins.input.base,
    marginBottom: theme.spacing[4],
  },
  button: {
    ...mixins.button.primary,
    marginTop: theme.spacing[3],
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: responsive.fontSize('lg'),
    fontWeight: theme.typography.fontWeights.bold,
  },
  linkButton: {
    marginTop: theme.spacing[5],
    alignItems: 'center',
    paddingVertical: theme.spacing[2],
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: responsive.fontSize('base'),
    fontWeight: theme.typography.fontWeights.medium,
  },
  errorContainer: {
    backgroundColor: theme.colors.error || '#FF3B30',
    padding: theme.spacing[3],
    borderRadius: theme.spacing[2],
    marginBottom: theme.spacing[4],
    width: '100%',
  },
  errorText: {
    color: theme.colors.white,
    fontSize: responsive.fontSize('sm'),
    textAlign: 'center',
    marginBottom: theme.spacing[2],
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.spacing[1],
    alignSelf: 'center',
  },
  retryButtonText: {
    color: theme.colors.white,
    fontSize: responsive.fontSize('sm'),
    fontWeight: theme.typography.fontWeights.medium,
  },
});