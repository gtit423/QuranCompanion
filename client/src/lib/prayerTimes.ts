import { PrayerTime } from "@/types/quran";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export const prayerTimesApi = {
  async getPrayerTimes(coordinates: Coordinates, date?: Date): Promise<PrayerTimesData | null> {
    try {
      const dateStr = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&method=2`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        const timings = data.data.timings;
        return {
          fajr: timings.Fajr,
          sunrise: timings.Sunrise,
          dhuhr: timings.Dhuhr,
          asr: timings.Asr,
          maghrib: timings.Maghrib,
          isha: timings.Isha,
        };
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch prayer times:", error);
      return null;
    }
  },

  formatPrayerTimes(times: PrayerTimesData): PrayerTime[] {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers: PrayerTime[] = [
      { name: "الفجر", time: this.formatTime(times.fajr) },
      { name: "الشروق", time: this.formatTime(times.sunrise) },
      { name: "الظهر", time: this.formatTime(times.dhuhr) },
      { name: "العصر", time: this.formatTime(times.asr) },
      { name: "المغرب", time: this.formatTime(times.maghrib) },
      { name: "العشاء", time: this.formatTime(times.isha) },
    ];

    // Calculate remaining time and mark current prayer
    let nextPrayerIndex = -1;
    let minDiff = Infinity;

    prayers.forEach((prayer, index) => {
      const prayerTime = this.parseTime(prayer.time);
      let diff = prayerTime - currentTime;
      
      // If prayer time has passed today, calculate for tomorrow
      if (diff < 0) {
        diff += 24 * 60; // Add 24 hours in minutes
      }
      
      if (diff < minDiff) {
        minDiff = diff;
        nextPrayerIndex = index;
      }
      
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      prayer.remaining = hours > 0 ? `باقي ${hours} ساعة ${minutes} دقيقة` : `باقي ${minutes} دقيقة`;
    });

    // Mark the next prayer as current
    if (nextPrayerIndex >= 0) {
      prayers[nextPrayerIndex].isCurrent = true;
    }

    return prayers;
  },

  formatTime(timeStr: string): string {
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
  },

  parseTime(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  },

  async getCurrentLocation(): Promise<Coordinates | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          // Default to Cairo, Egypt if geolocation fails
          resolve({
            latitude: 30.0444,
            longitude: 31.2357,
          });
        }
      );
    });
  }
};
