import { Color } from './color';

export interface ThemeColor {
  name: Color;
  hex: string;
}

export const themeColors: ThemeColor[] = [
  { name: Color.Purple, hex: '#9C27B0' },
  { name: Color.Orange, hex: '#FFC107' },
  { name: Color.Green, hex: '#4CAF50' },
  { name: Color.Blue, hex: '#2196F3' },
  { name: Color.Random, hex: '' }
];

export const themes: { name: string; darkMode: boolean; color: Color }[] = [
  { name: 'saga-purple', darkMode: false, color: Color.Purple },
  { name: 'arya-purple', darkMode: true, color: Color.Purple },
  { name: 'saga-orange', darkMode: false, color: Color.Orange },
  { name: 'arya-orange', darkMode: true, color: Color.Orange },
  { name: 'saga-green', darkMode: false, color: Color.Green },
  { name: 'arya-green', darkMode: true, color: Color.Green },
  { name: 'saga-blue', darkMode: false, color: Color.Blue },
  { name: 'arya-blue', darkMode: true, color: Color.Blue }
];
