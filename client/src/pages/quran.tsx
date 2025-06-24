import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { PrayerTimes } from "@/components/PrayerTimes";
import { SurahNavigation } from "@/components/SurahNavigation";
import { QuranReader } from "@/components/QuranReader";
import { QuranPage as QuranPageComponent } from "@/components/QuranPage";
import { TajweedRules } from "@/components/TajweedRules";
import { Footer } from "@/components/Footer";
import { useSurahs } from "@/hooks/useQuran";

export default function QuranPage() {
  const [activeSection, setActiveSection] = useState("quran");
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [viewMode, setViewMode] = useState<'reader' | 'page'>('page');
  const { data: surahs } = useSurahs();

  const currentSurah = surahs?.find(s => s.number === selectedSurah);
  const surahInfo = currentSurah 
    ? `${currentSurah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • ${currentSurah.numberOfAyahs} آيات`
    : '';

  const renderContent = () => {
    switch (activeSection) {
      case "quran":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SurahNavigation 
                selectedSurah={selectedSurah}
                onSurahSelect={setSelectedSurah}
              />
              <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-[hsl(135,60%,16%)] mb-3">طريقة العرض</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setViewMode('page')}
                    className={`w-full text-right p-3 rounded-lg transition-colors ${
                      viewMode === 'page'
                        ? 'bg-[hsl(135,60%,16%)] text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <i className="fas fa-book-open ml-2"></i>
                    عرض صفحات
                  </button>
                  <button
                    onClick={() => setViewMode('reader')}
                    className={`w-full text-right p-3 rounded-lg transition-colors ${
                      viewMode === 'reader'
                        ? 'bg-[hsl(135,60%,16%)] text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <i className="fas fa-list ml-2"></i>
                    عرض تقليدي
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              {viewMode === 'page' ? (
                <QuranPageComponent
                  surahNumber={selectedSurah}
                  surahName={currentSurah?.name || 'سورة الفاتحة'}
                  surahInfo={surahInfo}
                />
              ) : (
                <QuranReader 
                  surahNumber={selectedSurah}
                  surahName={currentSurah?.name || 'سورة الفاتحة'}
                  surahInfo={surahInfo}
                />
              )}
            </div>
          </div>
        );
      case "tajweed":
        return <TajweedRules />;
      case "prayer-times":
      case "bookmarks":
      default:
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-[hsl(135,60%,16%)] mb-4">
              قريباً إن شاء الله
            </h2>
            <p className="text-gray-600">هذا القسم قيد التطوير</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(48,24%,96%)]">
      <Header />
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <PrayerTimes />
        {renderContent()}
      </div>
      
      <Footer />
    </div>
  );
}
