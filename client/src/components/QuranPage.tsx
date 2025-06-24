import { useState } from "react";
import { useSurahVerses } from "@/hooks/useQuran";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuranPageProps {
  surahNumber: number;
  surahName: string;
  surahInfo: string;
}

export function QuranPage({ surahNumber, surahName, surahInfo }: QuranPageProps) {
  const { data: verses, isLoading } = useSurahVerses(surahNumber);
  const [currentPage, setCurrentPage] = useState(1);
  const versesPerPage = 10;

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

  if (!verses || verses.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">لا توجد آيات متاحة</p>
      </Card>
    );
  }

  const totalPages = Math.ceil(verses.length / versesPerPage);
  const startIndex = (currentPage - 1) * versesPerPage;
  const currentVerses = verses.slice(startIndex, startIndex + versesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className="overflow-hidden">
      {/* Surah Header */}
      <div className="bg-gradient-to-r from-[hsl(135,60%,16%)] to-[hsl(135,40%,35%)] text-white p-6 text-center">
        <h2 className="text-4xl font-bold font-amiri mb-2">{surahName}</h2>
        <p className="text-[hsl(51,100%,42%)] text-lg">{surahInfo}</p>
        <div className="mt-4 text-6xl font-amiri text-[hsl(51,100%,42%)]">{surahNumber}</div>
      </div>

      {/* Bismillah */}
      {surahNumber !== 1 && surahNumber !== 9 && currentPage === 1 && (
        <div className="p-8 text-center border-b-2 border-[hsl(51,100%,42%)] bg-[hsl(48,24%,96%)]">
          <div className="text-5xl font-amiri text-[hsl(135,60%,16%)] leading-relaxed">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="min-h-[600px] bg-white p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {currentVerses.map((verse) => (
            <div
              key={verse.numberInSurah}
              className="text-center p-6 rounded-lg hover:bg-[hsl(51,100%,42%)]/5 transition-colors"
            >
              <div className="verse-text font-amiri text-[hsl(135,60%,16%)] text-3xl leading-loose mb-4">
                {verse.text} 
                <span className="inline-block bg-[hsl(135,60%,16%)] text-white rounded-full w-10 h-10 text-lg leading-10 mx-2">
                  {verse.numberInSurah}
                </span>
              </div>
              
              <div className="flex justify-center space-x-reverse space-x-4 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[hsl(135,60%,16%)] hover:text-[hsl(51,100%,42%)] hover:bg-[hsl(51,100%,42%)]/10"
                  onClick={() => {
                    // Play verse audio
                    const audio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verse.number.toString().padStart(6, '0')}.mp3`);
                    audio.play().catch(err => console.error("Audio playback failed:", err));
                  }}
                >
                  <i className="fas fa-play ml-2"></i>
                  تلاوة الآية
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[hsl(135,60%,16%)] hover:text-[hsl(51,100%,42%)] hover:bg-[hsl(51,100%,42%)]/10"
                >
                  <i className="far fa-bookmark ml-2"></i>
                  حفظ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Navigation */}
      <div className="bg-[hsl(48,24%,96%)] border-t-2 border-[hsl(51,100%,42%)] p-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="bg-[hsl(135,60%,16%)] text-white hover:bg-[hsl(135,40%,35%)] disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4 ml-2" />
            الصفحة السابقة
          </Button>
          
          <div className="flex items-center space-x-reverse space-x-4">
            <span className="text-[hsl(135,60%,16%)] font-semibold">
              صفحة {currentPage} من {totalPages}
            </span>
            <div className="text-sm text-gray-500">
              ({startIndex + 1}-{Math.min(startIndex + versesPerPage, verses.length)} من {verses.length} آية)
            </div>
          </div>
          
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="bg-[hsl(135,60%,16%)] text-white hover:bg-[hsl(135,40%,35%)] disabled:opacity-50"
          >
            الصفحة التالية
            <ChevronLeft className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}