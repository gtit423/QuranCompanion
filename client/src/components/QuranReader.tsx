import { useState } from "react";
import { useSurahVerses } from "@/hooks/useQuran";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "./AudioPlayer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface QuranReaderProps {
  surahNumber: number;
  surahName: string;
  surahInfo: string;
}

export function QuranReader({ surahNumber, surahName, surahInfo }: QuranReaderProps) {
  const { data: verses, isLoading } = useSurahVerses(surahNumber);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation({
    mutationFn: async (data: { userId: number; surahNumber: number; verseNumber: number }) => {
      return apiRequest("POST", "/api/bookmarks", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  const handleBookmark = (verseNumber: number) => {
    bookmarkMutation.mutate({
      userId: 1, // Default user for demo
      surahNumber,
      verseNumber,
    });
  };

  const handleVerseSelect = (verseNumber: number) => {
    setSelectedVerse(selectedVerse === verseNumber ? null : verseNumber);
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="animate-pulse">
          <div className="bg-gradient-to-r from-[hsl(135,60%,16%)] to-[hsl(135,40%,35%)] h-48"></div>
          <div className="p-6 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {/* Surah Header */}
      <div className="bg-gradient-to-r from-[hsl(135,60%,16%)] to-[hsl(135,40%,35%)] text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold font-amiri">{surahName}</h2>
            <p className="text-[hsl(51,100%,42%)]">{surahInfo}</p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-amiri text-[hsl(51,100%,42%)]">{surahNumber}</div>
          </div>
        </div>
        
        <AudioPlayer surahNumber={surahNumber} />
      </div>

      {/* Bismillah */}
      {surahNumber !== 1 && surahNumber !== 9 && (
        <div className="p-6 text-center border-b border-gray-200">
          <div className="text-4xl font-amiri text-[hsl(135,60%,16%)] leading-relaxed">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        </div>
      )}

      {/* Verses */}
      <div className="p-6">
        {verses?.map((verse) => (
          <div
            key={verse.numberInSurah}
            className={`mb-8 p-4 rounded-lg transition-colors cursor-pointer ${
              selectedVerse === verse.numberInSurah
                ? "bg-[hsl(51,100%,42%)]/10 border border-[hsl(51,100%,42%)]"
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleVerseSelect(verse.numberInSurah)}
          >
            <div className="verse-text font-amiri text-[hsl(135,60%,16%)] text-right leading-loose mb-4">
              {verse.text} ﴿{verse.numberInSurah}﴾
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-reverse space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[hsl(135,60%,16%)] hover:text-[hsl(51,100%,42%)]"
                  onClick={async () => {
                    try {
                      const paddedVerse = verse.number.toString().padStart(6, '0');
                      const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${paddedVerse}.mp3`;
                      console.log('Playing verse audio:', audioUrl);
                      const audio = new Audio(audioUrl);
                      
                      audio.addEventListener('loadeddata', () => {
                        console.log('Audio loaded, attempting to play');
                        audio.play().catch(err => console.error("Audio playback failed:", err));
                      });
                      
                      audio.addEventListener('error', (e) => {
                        console.error("Audio loading failed:", e);
                      });
                      
                      audio.load();
                    } catch (error) {
                      console.error("Error creating audio:", error);
                    }
                  }}
                >
                  <i className="fas fa-play"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBookmark(verse.numberInSurah)}
                  className="text-[hsl(135,60%,16%)] hover:text-[hsl(51,100%,42%)]"
                >
                  <i className="far fa-bookmark"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[hsl(135,60%,16%)] hover:text-[hsl(51,100%,42%)]"
                >
                  <i className="fas fa-share"></i>
                </Button>
              </div>
              <div className="bg-[hsl(51,100%,42%)] text-white px-3 py-1 rounded-full text-sm font-bold">
                {verse.numberInSurah}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
