import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { Card } from "@/components/ui/card";

export function PrayerTimes() {
  const { prayerTimes, isLoading } = usePrayerTimes();

  if (isLoading) {
    return (
      <div className="prayer-time-card rounded-xl p-6 text-white mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white/20 rounded-lg p-4 h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="prayer-time-card rounded-xl p-6 text-white mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">أوقات الصلاة</h2>
        <div className="text-[hsl(51,100%,42%)]">
          <i className="fas fa-map-marker-alt"></i>
          <span className="mr-2">القاهرة، مصر</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {prayerTimes.map((prayer) => (
          <div
            key={prayer.name}
            className={`rounded-lg p-4 text-center ${
              prayer.isCurrent
                ? "bg-[hsl(51,100%,42%)] bg-opacity-90 text-[hsl(135,60%,16%)] border-2 border-yellow-300"
                : "bg-white bg-opacity-20"
            }`}
          >
            <div className="text-lg font-semibold mb-2">{prayer.name}</div>
            <div className={`text-2xl font-bold ${prayer.isCurrent ? "" : "text-[hsl(51,100%,42%)]"}`}>
              {prayer.time}
            </div>
            <div className={`text-sm ${prayer.isCurrent ? "font-semibold" : "opacity-80"}`}>
              {prayer.isCurrent ? "الآن" : prayer.remaining || ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
