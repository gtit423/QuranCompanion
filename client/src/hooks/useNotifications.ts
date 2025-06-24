import { useState, useEffect } from "react";
import { usePrayerTimes } from "./usePrayerTimes";

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isEnabled, setIsEnabled] = useState(false);
  const { prayerTimes } = usePrayerTimes();

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
      setIsEnabled(Notification.permission === "granted");
    }
  }, []);

  const requestPermission = async () => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      try {
        const result = await Notification.requestPermission();
        setPermission(result);
        setIsEnabled(result === "granted");
        
        if (result === "granted") {
          schedulePrayerNotifications();
        }
        
        return result;
      } catch (error) {
        console.error("Failed to request notification permission:", error);
        return "denied";
      }
    }
    return "denied";
  };

  const schedulePrayerNotifications = () => {
    if (!isEnabled || prayerTimes.length === 0) return;

    // Clear existing timeouts
    const timeouts = JSON.parse(localStorage.getItem("prayerTimeouts") || "[]");
    timeouts.forEach((timeoutId: number) => clearTimeout(timeoutId));

    const newTimeouts: number[] = [];

    prayerTimes.forEach(prayer => {
      if (!prayer.remaining) return;

      const now = new Date();
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);

      // If prayer time is tomorrow
      if (prayerTime <= now) {
        prayerTime.setDate(prayerTime.getDate() + 1);
      }

      const timeUntilPrayer = prayerTime.getTime() - now.getTime();

      if (timeUntilPrayer > 0) {
        const timeoutId = window.setTimeout(() => {
          showPrayerNotification(prayer.name, prayer.time);
        }, timeUntilPrayer);

        newTimeouts.push(timeoutId);
      }
    });

    localStorage.setItem("prayerTimeouts", JSON.stringify(newTimeouts));
  };

  const showPrayerNotification = (prayerName: string, time: string) => {
    if (!isEnabled) return;

    new Notification(`حان وقت ${prayerName}`, {
      body: `الوقت الآن ${time}`,
      icon: "/favicon.ico",
      tag: "prayer-time",
      requireInteraction: true,
    });
  };

  useEffect(() => {
    if (isEnabled && prayerTimes.length > 0) {
      schedulePrayerNotifications();
    }
  }, [isEnabled, prayerTimes]);

  return {
    permission,
    isEnabled,
    requestPermission,
  };
}
