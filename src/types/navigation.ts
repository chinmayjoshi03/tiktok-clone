import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack Navigation Types
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// Main Tab Navigation Types
export type MainTabParamList = {
  Tabs: undefined;
  Comments: { videoId: string };
};

// Tab Navigator Types
export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};

// Root Stack Navigation Types
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Navigation Props Types
export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: any;
  route: { params: AuthStackParamList[T] };
};

export type MainTabScreenProps<T extends keyof MainTabParamList> = {
  navigation: any;
  route: { params: MainTabParamList[T] };
};