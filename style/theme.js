export default {
  // Primary Colors
  PRIMARY_COLOR: '#667eea',
  PRIMARY_LIGHT: '#764ba2',
  PRIMARY_DARK: '#5a67d8',
  
  // Gradient Colors
  PRIMARY_GRADIENT: ['#667eea', '#764ba2'],
  SECONDARY_GRADIENT: ['#f093fb', '#f5576c'],
  SUCCESS_GRADIENT: ['#11998e', '#38ef7d'],
  WARNING_GRADIENT: ['#fcb045', '#fd1d1d'],
  GLASS_GRADIENT: ['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)'],
  
  // Accent Colors
  ACCENT_COLOR: '#f093fb',
  ACCENT_LIGHT: '#f5b7ff',
  ACCENT_DARK: '#e056fd',
  
  // Background Colors
  BACKGROUND_PRIMARY: '#ffffff',
  BACKGROUND_SECONDARY: '#f8fafc',
  BACKGROUND_TERTIARY: '#f1f5f9',
  BACKGROUND_DARK: '#1a202c',
  BACKGROUND_GLASS: 'rgba(255, 255, 255, 0.85)',
  BACKGROUND_BLUR: 'rgba(255, 255, 255, 0.95)',
  
  // Text Colors
  TEXT_PRIMARY: '#2d3748',
  TEXT_SECONDARY: '#4a5568',
  TEXT_MUTED: '#718096',
  TEXT_LIGHT: '#a0aec0',
  TEXT_WHITE: '#ffffff',
  
  // Border Colors
  BORDER_LIGHT: '#e2e8f0',
  BORDER_MEDIUM: '#cbd5e0',
  BORDER_DARK: '#a0aec0',
  BORDER_GLASS: 'rgba(255, 255, 255, 0.3)',
  
  // Status Colors
  SUCCESS: '#48bb78',
  WARNING: '#ed8936',
  ERROR: '#f56565',
  INFO: '#4299e1',
  
  // Shadow Colors
  SHADOW_LIGHT: 'rgba(0, 0, 0, 0.05)',
  SHADOW_MEDIUM: 'rgba(0, 0, 0, 0.1)',
  SHADOW_DARK: 'rgba(0, 0, 0, 0.15)',
  SHADOW_COLORED: 'rgba(102, 126, 234, 0.25)',
  
  // Note Colors (Enhanced with more aesthetic options)
  NOTE_COLORS: [
    '#667eea', // Primary Blue
    '#f093fb', // Pink
    '#48bb78', // Green
    '#ed8936', // Orange
    '#9f7aea', // Purple
    '#38b2ac', // Teal
    '#f56565', // Red
    '#4299e1', // Blue
    '#ff9a9e', // Light Pink
    '#fecfef', // Lavender
    '#a8edea', // Mint
    '#ffd93d', // Yellow
    '#6bcf7f', // Light Green
    '#4facfe', // Sky Blue
    '#fa709a', // Rose
    '#ffeaa7', // Cream
  ],
  
  // Spacing
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 48,
    XXXL: 64,
  },
  
  // Border Radius
  RADIUS: {
    XS: 4,
    SM: 6,
    MD: 12,
    LG: 16,
    XL: 24,
    XXL: 32,
    FULL: 999,
  },
  
  // Typography
  FONT_SIZES: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 32,
  },
  
  FONT_WEIGHTS: {
    LIGHT: '300',
    NORMAL: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
    EXTRABOLD: '800',
  },
  
  // Enhanced Elevation/Shadow presets
  ELEVATION: {
    NONE: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    SMALL: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    MEDIUM: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    LARGE: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
    XLARGE: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
      elevation: 12,
    },
    // Glass Morphism Effect
    GLASS: {
      shadowColor: '#667eea',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 15,
    },
    // Colored Shadow
    COLORED: {
      shadowColor: '#667eea',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 10,
    }
  },
  
  // Animation Properties
  ANIMATION: {
    FAST: 150,
    NORMAL: 250,
    SLOW: 350,
    EXTRA_SLOW: 500,
  },
  
  // Glass Morphism Properties
  GLASS: {
    LIGHT: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    MEDIUM: {
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    HEAVY: {
      backgroundColor: 'rgba(255, 255, 255, 0.65)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.7)',
    }
  }
};
