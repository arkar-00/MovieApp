# Movie App Setup Guide

![React Native](https://img.shields.io/badge/React%20Native-0.79.4-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Expo](https://img.shields.io/badge/Expo-SDK%2053-blue.svg)

## 🚀 Quick Start

### 1. Get Your TMDB API Key

- Visit [The Movie Database](https://www.themoviedb.org/)
- Sign up and request an API key
- Copy your API key

### 2. Configure API Key

**Option 1: Using Environment Variables (Recommended)**
- Create a `.env` file in the project root
- Add:
    ```
    EXPO_PUBLIC_API_KEY=your_actual_api_key_here
    EXPO_PUBLIC_BASE_URL=your_actual_url
    EXPO_PUBLIC_IMAGE_BASE_URL=your_actual_url
    ```
- `.env` is already in `.gitignore` for security

**Option 2: Direct Configuration**
- Open `src/config/api.ts`
- Replace the `apiKey` value with your API key

### 3. Install Dependencies

```bash
yarn install
```

### 4. Start the App

```bash
yarn start
```

---

## ✨ Features Implemented

- **Two Screens**
    - Movie List Screen (Upcoming & Popular tabs)
    - Movie Details Screen
- **Favorites:** Mark/unmark movies as favorites (local storage)
- **Offline-First:** Cached data available offline
- **Infinite Scrolling:** Load more movies on scroll
- **Pull-to-Refresh:** Refresh movie lists (on both list and details screens)
- **Parallel Scroll Animation:** Parallax effect on Movie Details Screen using `react-native-reanimated`
- **Overlay Back Button:** Floating back button on Movie Details Screen
- **Error Handling:** Error states with retry
- **Loading States:** Loading indicators
- **Responsive Design:** Adapts to all screen sizes
- **Safe Areas:** Handles status bars and notches
- **Environment Variables:** Secure API key management

---

## 🛠️ Requirements

- React Navigation
- Axios + RxJS for API calls
- Redux-Saga for async middleware
- React-Redux and Redux
- AsyncStorage for favorites
- React-Native-Keychain
- Reusable components
- HOC for API states
- Background async API calls
- React hooks
- TypeScript
- Offline support (offline-first)
- Dependency Injection pattern
- Reactive Programming with RxJS
- Responsive status bar
- Safe area handling

---

## 🔗 API Endpoints Used

- `/movie/popular` — Popular Movies
- `/movie/upcoming` — Upcoming Movies
- `/movie/{id}` — Movie Details

_All API calls are cached locally for offline support._

---

## 🔒 Security Notes

- API keys are stored in environment variables
- `.env` is excluded from version control
- **Never commit your actual API keys to the repository**

## 🧪 Scripts

```bash
# Development
npm start          # Expo dev server
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser

# Code Quality
npm run lint       # ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Prettier
npm run test       # Testing

# Build
npm run build      # Production build
```
