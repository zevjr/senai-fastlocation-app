export const colors = {
  primary: '#FF6B00',
  primaryLight: '#FFF3E8',
  primaryDark: '#E55A00',
  secondary: '#1A1A2E',
  background: '#F5F5F5',
  white: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  textMuted: '#AAAAAA',
  border: '#E0E0E0',
  error: '#D32F2F',
  errorLight: '#FFEBEE',
  success: '#388E3C',
  card: '#FFFFFF',
  shadow: '#000000',
} as const;

export type ColorKey = keyof typeof colors;
