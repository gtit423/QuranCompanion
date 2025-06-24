export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Verse {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
}

export interface PrayerTime {
  name: string;
  time: string;
  remaining?: string;
  isCurrent?: boolean;
}

export interface TajweedRule {
  id: string;
  title: string;
  description: string;
  examples: string[];
  category: string;
}
