// Screen names
export const SCREEN_NAMES = {
  BOTTOM_TAB: 'BottomTab',
  HOME: 'Home',
  WALLET: 'Wallet',
  MORE: 'More',
  MOVIE_DETAIL: 'MovieDetail',
} as const

export const STORAGE_KEYS = {
  UPCOMING_MOVIES: 'upcoming_movies',
  POPULAR_MOVIES: 'popular_movies',
  MOVIE_DETAILS: 'movie_details_',
}

export const TAB_DATA = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'popular', label: 'Popular' },
]

export const CACHE_DURATION = 5 * 60 * 1000 // 5 mins

// Colors
export const COLORS = {
  // Primary colors
  PRIMARY: '#007AFF',
  PRIMARY_LIGHT: '#FFE5E5',

  // Secondary colors
  SECONDARY: '#2F435D',
  SECONDARY_LIGHT: '#C8E6C9',

  // Success colors
  SUCCESS: '#4CAF50',
  SUCCESS_LIGHT: '#E8F5E8',

  // Neutral colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_LIGHT: '#E0E0E0',
  GRAY_MEDIUM: '#CCCCCC',
  GRAY_DARK: '#888888',
  GRAY_TEXT: '#4A4A4A',
  GRAY_DISABLED: '#666666',
  RED: '#FF3B30',
  YELLOW: '#FFD700',

  // Background colors
  BACKGROUND_LIGHT: '#F5F5F5',

  // Error colors
  ERROR: '#F44336',

  // Accent colors
  ACCENT_BLUE: '#E3F2FD',
  ACCENT_PURPLE: '#F3E5F5',
  ACCENT_ORANGE: '#FFF3E0',

  SELECTED_COLOR: '#4A5D6A',
} as const

// Dimensions
export const DIMENSIONS = {
  // Border radius
  BORDER_RADIUS_SMALL: 2,
  BORDER_RADIUS_MEDIUM: 10,
  BORDER_RADIUS_LARGE: 20,
  BORDER_RADIUS_BUTTON: 15,

  // Spacing
  SPACING_XS: 4,
  SPACING_SM: 8,
  SPACING_MD: 12,
  SPACING_LG: 16,
  SPACING_XL: 20,
  SPACING_XXL: 24,
  SPACING_XXXL: 32,
  SPACING_SECTION: 40,
  SPACING_SCREEN: 60,

  // Button dimensions
  BUTTON_MIN_HEIGHT: 50,
  BUTTON_PADDING_VERTICAL: 16,
  BUTTON_PADDING_HORIZONTAL: 32,

  // Radio button dimensions
  RADIO_SIZE: 20,
  RADIO_INNER_SIZE: 10,
  RADIO_BORDER_WIDTH: 2,

  // Progress bar
  PROGRESS_BAR_HEIGHT: 4,

  // Illustrations
  PILL_SIZE: 40,
  CHARACTER_EMOJI_SIZE: 80,
} as const

// Font sizes
export const FONT_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 20,
  XL: 24,
  XXL: 32,
} as const

// Font weights
export const FONT_WEIGHTS = {
  NORMAL: '400' as const,
  MEDIUM: '500' as const,
  SEMIBOLD: '600' as const,
  BOLD: 'bold' as const,
}

// Animation values
export const ANIMATION = {
  ACTIVE_OPACITY: 0.8,
  LONG_PRESS_DELAY: 150,
  ACTIVATION_DISTANCE: 10,
} as const
