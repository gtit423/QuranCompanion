import { useQuery } from "@tanstack/react-query";
import { quranApi } from "@/lib/quranApi";
import { Surah, Verse } from "@/types/quran";

export function useSurahs() {
  return useQuery<Surah[]>({
    queryKey: ["surahs"],
    queryFn: () => quranApi.getSurahs(),
    staleTime: Infinity, // Surah list doesn't change
  });
}

export function useSurahVerses(surahNumber: number) {
  return useQuery<Verse[]>({
    queryKey: ["surah", surahNumber],
    queryFn: () => quranApi.getSurahVerses(surahNumber),
    enabled: !!surahNumber,
    staleTime: Infinity, // Quran text doesn't change
  });
}
