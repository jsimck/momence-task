export const theme = {
  colors: {
    foreground: '#09090b',
    background: 'rgba(255, 255, 255, 0.8)',
    backgroundSecondary: 'rgba(244, 244, 245, 0.5)',
    backgroundPage: '#f8fafc',
    backgroundOverlayLight: 'rgba(255, 255, 255, 0.5)',
    backgroundOverlay: 'rgba(255, 255, 255, 0.6)',
    backgroundSolid: '#ffffff',
    borderLight: 'rgba(255, 255, 255, 0.4)',
    blobPrimary: 'rgba(99, 102, 241, 0.15)',
    blobSecondary: 'rgba(236, 72, 153, 0.1)',
    primary: '#6366f1',
    primaryFg: '#ffffff',
    border: 'rgba(228, 228, 231, 0.6)',
    muted: '#71717a',
    mutedForeground: '#a1a1aa',
    input: '#ffffff',
    ring: '#6366f1',
    success: '#10b981',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '24px',
    full: '9999px',
  },
};

declare module 'styled-components' {
  interface DefaultTheme {
    colors: typeof theme.colors;
    shadows: typeof theme.shadows;
    radius: typeof theme.radius;
  }
}
