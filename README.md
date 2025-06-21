Movie App Setup Guide
Quick Start
Get your TMDB API Key

Visit The Movie Database

Sign up and request an API key

Copy your API key

Configure API Key

Option 1: Using Environment Variables (Recommended)

Create a .env file in the project root

Add: TMDB_API_KEY=your_actual_api_key_here

.env is already in .gitignore for security

Option 2: Direct Configuration

Open src/config/api.ts

Replace the apiKey value with your API key

Install Dependencies (if not already done)

yarn install

Start the App

yarn start

Features Implemented
Two Screens

Movie List Screen (Upcoming & Popular tabs)

Movie Details Screen

Requirements

React Navigation

Axios + RxJS for API calls

Redux-Saga for async middleware

React-Redux and Redux

AsyncStorage for favorites

React-Native-Keychain

Reusable components

HOC for API states

Background async API calls

React hooks

TypeScript

Offline support (offline-first)

Dependency Injection pattern

Reactive Programming with RxJS

Responsive status bar

Safe area handling

Key Features
Offline-First: Cached data available offline

Favorites: Mark/unmark movies as favorites (local storage)

Infinite Scrolling: Load more movies on scroll

Pull-to-Refresh: Refresh movie lists (on both list and details screens)

Parallel Scroll Animation (Parallax Effect): Engaging visual effect on the Movie Details Screen using react-native-reanimated.

Overlay Back Button: A floating back button on the Movie Details Screen for improved navigation experience.

Error Handling: Error states with retry

Loading States: Loading indicators

Responsive Design: Adapts to all screen sizes

Safe Areas: Handles status bars and notches

Environment Variables: Secure API key management

API Endpoints Used
/movie/popular — Popular Movies

/movie/upcoming — Upcoming Movies

/movie/{id} — Movie Details

All API calls are cached locally for offline support.

Security Notes
API keys are stored in environment variables

.env is excluded from version control

Never commit your actual API keys to the repository