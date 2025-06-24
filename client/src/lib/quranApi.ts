import { Surah, Verse, Reciter } from "@/types/quran";

const QURAN_API_BASE = "https://api.alquran.cloud/v1";

export const quranApi = {
  // Get all surahs
  async getSurahs(): Promise<Surah[]> {
    try {
      const response = await fetch(`${QURAN_API_BASE}/surah`);
      const data = await response.json();
      return data.data.map((surah: any) => ({
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        englishNameTranslation: surah.englishNameTranslation,
        numberOfAyahs: surah.numberOfAyahs,
        revelationType: surah.revelationType,
      }));
    } catch (error) {
      console.error("Failed to fetch surahs:", error);
      return [];
    }
  },

  // Get verses for a specific surah
  async getSurahVerses(surahNumber: number): Promise<Verse[]> {
    try {
      const response = await fetch(`${QURAN_API_BASE}/surah/${surahNumber}`);
      const data = await response.json();
      return data.data.ayahs.map((ayah: any) => ({
        number: ayah.number,
        text: ayah.text,
        numberInSurah: ayah.numberInSurah,
        juz: ayah.juz,
        manzil: ayah.manzil,
        page: ayah.page,
        ruku: ayah.ruku,
        hizbQuarter: ayah.hizbQuarter,
        sajda: ayah.sajda,
      }));
    } catch (error) {
      console.error("Failed to fetch surah verses:", error);
      return [];
    }
  },

  // Get audio URL for a specific reciter and surah
  getAudioUrl(reciterId: string, surahNumber: number): string {
    const paddedSurah = surahNumber.toString().padStart(3, '0');
    return `https://server8.mp3quran.net/ahmad_huth/${paddedSurah}.mp3`;
  },

  // Get verse audio URL
  getVerseAudioUrl(reciterId: string, verseNumber: number): string {
    const paddedVerse = verseNumber.toString().padStart(6, '0');
    return `https://everyayah.com/data/Alafasy_128kbps/${paddedVerse}.mp3`;
  }
};

export const reciters: Reciter[] = [
  { id: "ahmad_huth", name: "Ahmad Huth", arabicName: "أحمد حوث" },
  { id: "alafasy", name: "Mishary Rashid Alafasy", arabicName: "مشاري راشد العفاسي" },
  { id: "sudais", name: "Abdul Rahman Al-Sudais", arabicName: "عبد الرحمن السديس" },
  { id: "muaiqly", name: "Maher Al Muaiqly", arabicName: "ماهر المعيقلي" },
  { id: "shuraym", name: "Saood Al Shuraym", arabicName: "سعود الشريم" },
];
