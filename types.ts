
export enum Tab {
  Today = 'today',
  Journey = 'journey',
  Quran = 'quran',
  Namaz = 'namaz',
  Settings = 'settings'
}

export interface Settings {
  haidMode: boolean;
  city: string;
  latitude?: number;
  longitude?: number;
  showNiyyah: boolean;
  quietDay: boolean;
  notifications: boolean;
  mosqueImage: string;
  // Новые параметры
  font: 'manrope' | 'serif' | 'elegant';
  textSize: 'small' | 'standard' | 'large';
  appBackground: 'default' | 'sand' | 'mint' | 'rose' | 'sky' | 'beige' | 'custom';
  customBgImage?: string;
  nightMode: boolean;
  beadType: 'dark_wood' | 'light_wood' | 'stone' | 'ivory';
  zikrSound: 'off' | 'soft_click' | 'neutral_touch';
  zikrVibration: boolean;
  zikrDefaultCount: 33 | 99 | number;
}

export interface DayProgress {
  date: string; // "YYYY-MM-DD" format for keys
  displayDate: string; // "24 Марта"
  hijriDate: string;
  mood: number;
  prideLevel: number;
  tasbihCount: number;
  tasbihTarget: number;
  tasbihCycles: number;
  completedPrayers: string[];
  completedSunnah: string[];
  completedAdditional: string[];
  completedPractices: string[];
  completedQuran: string[];
  repeatedSurahs: string[];
  repeatedJuzs: string[];
  witrCompleted: boolean;
  gratitude: string;
  niyyah: string;
  soulState: string;
  charityNotes: string;
  duaNotes: string;
  sadaqaNotes: string;
  goodDeedsNotes: string;
  selectedSurah: string;
  selectedJuz: string;
}

export interface AppHistory {
  [dateKey: string]: DayProgress;
}
