import { useSurahs } from "@/hooks/useQuran";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SurahNavigationProps {
  selectedSurah: number;
  onSurahSelect: (surahNumber: number) => void;
}

export function SurahNavigation({ selectedSurah, onSurahSelect }: SurahNavigationProps) {
  const { data: surahs, isLoading } = useSurahs();

  if (isLoading) {
    return (
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="text-[hsl(135,60%,16%)]">فهرس السور</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="text-[hsl(135,60%,16%)]">فهرس السور</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-2">
            {surahs?.map((surah) => (
              <div
                key={surah.number}
                onClick={() => onSurahSelect(surah.number)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors border-r-4 ${
                  selectedSurah === surah.number
                    ? "bg-[hsl(51,100%,42%)]/10 border-[hsl(51,100%,42%)]"
                    : "hover:bg-gray-50 border-[hsl(51,100%,42%)]"
                }`}
              >
                <div>
                  <div className="font-semibold text-[hsl(135,60%,16%)]">{surah.name}</div>
                  <div className="text-sm text-gray-500">{surah.englishName}</div>
                </div>
                <div className="text-[hsl(51,100%,42%)] font-bold">{surah.number}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
