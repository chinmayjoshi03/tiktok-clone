# TikTok Clone - React Native Expo App

A fully functional TikTok clone built with React Native Expo, featuring real video playback, authentication, comments, and all the core TikTok functionality.

## 🎥 Features

### Core Functionality
- **Real Video Playback** - Auto-play/pause with smooth scrolling
- **Interactive Actions** - Like, comment, share buttons with animations
- **Comments System** - Full commenting functionality with real-time updates
- **User Authentication** - Firebase email/password authentication
- **5-Tab Navigation** - Complete TikTok-style bottom navigation

### Screens & Navigation
- **🏠 Home** - Video feed with vertical scrolling
- **🔍 Discover** - Trending hashtags and sounds
- **➕ Upload** - Content creation interface
- **💬 Notifications** - Activity feed with likes, comments, follows
- **👤 Profile** - User profile with logout functionality

### Technical Features
- **Firebase Integration** - Authentication and user management
- **Smooth Animations** - Like button animations and transitions
- **Responsive Design** - Works on iOS and Android
- **Professional UI** - Dark theme with TikTok-style design
- **TypeScript** - Full type safety throughout the app

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tiktok-clone.git
   cd tiktok-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Optional - for authentication)
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication with Email/Password provider
   - Update `src/config/firebase.config.ts` with your Firebase credentials
   - Create a `.env` file with your Firebase config

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   - Scan QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator

## 📱 App Structure

```
src/
├── components/           # React components
│   ├── auth/            # Login/Signup screens
│   ├── video/           # Video player and related components
│   └── common/          # Reusable UI components
├── contexts/            # React Context providers
├── config/              # Firebase and app configuration
├── data/                # Dummy data and constants
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🎯 Key Components

### Video Feed
- **VideoFeed.tsx** - Main video scrolling component
- **VideoPlayer.tsx** - Individual video player with controls
- **VideoOverlay.tsx** - Creator info and video details
- **ActionButtons.tsx** - Like, comment, share interactions

### Authentication
- **AuthContext.tsx** - Firebase authentication state management
- **LoginScreen.tsx** - User login interface
- **SignUpScreen.tsx** - User registration interface

### Navigation
- **App.tsx** - Main app with 5-tab bottom navigation
- Conditional rendering based on authentication state

## 🔧 Configuration

### Firebase Setup (Optional)
If you want to use authentication, update `src/config/firebase.config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Environment Variables
Create a `.env` file in the root directory:
```
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## 📦 Dependencies

### Main Dependencies
- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **Firebase** - Authentication and backend services
- **React Navigation** - Navigation library
- **Expo AV** - Video playback functionality

### Key Packages
```json
{
  "expo": "~53.0.17",
  "react": "19.0.0",
  "react-native": "0.79.5",
  "firebase": "^11.10.0",
  "@react-navigation/native": "^7.1.14",
  "@react-navigation/stack": "^7.4.2",
  "@react-navigation/bottom-tabs": "^7.4.2",
  "expo-av": "~14.0.7"
}
```

## 🎨 UI/UX Features

- **Dark Theme** - Professional TikTok-style dark interface
- **Smooth Animations** - Like button scaling and transitions
- **Responsive Design** - Adapts to different screen sizes
- **Interactive Elements** - Haptic feedback and visual responses
- **Professional Icons** - Emoji-based icons for simplicity

## 🔄 Video Features

- **Auto-play/Pause** - Videos play automatically when in view
- **Tap to Pause** - Tap video to pause/resume playback
- **Looping** - Videos loop automatically when finished
- **Smooth Scrolling** - Vertical scrolling with snap-to-video
- **Performance Optimized** - Efficient video rendering and memory management

## 💬 Social Features

- **Like System** - Animated like button with count updates
- **Comments** - Full commenting system with timestamps
- **User Profiles** - Basic profile information and stats
- **Activity Feed** - Notifications for likes, comments, follows

## 🚧 Future Enhancements

- [ ] Video recording and upload functionality
- [ ] Real-time chat and messaging
- [ ] Advanced video effects and filters
- [ ] Social features (follow/unfollow, user discovery)
- [ ] Push notifications
- [ ] Video sharing to other platforms
- [ ] Advanced analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Inspired by TikTok's user interface and functionality
- Built with React Native Expo for cross-platform compatibility
- Uses Firebase for authentication and backend services
- Sample videos from Google's video test suite

---

**Note**: This is a clone project for educational purposes. All video content used is from public domain sources.
