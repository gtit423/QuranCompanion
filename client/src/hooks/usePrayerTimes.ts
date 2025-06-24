import { useQuery } from "@tanstack/react-query";
import { prayerTimesApi, Coordinates } from "@/lib/prayerTimes";
import { PrayerTime } from "@/types/quran";
import { useState, useEffect } from "react";

export function usePrayerTimes() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    prayerTimesApi.getCurrentLocation().then(setCoordinates);
  }, []);

  const { data: prayerTimesData, isLoading } = useQuery({
    queryKey: ["prayer-times", coordinates],
    queryFn: () => coordinates ? prayerTimesApi.getPrayerTimes(coordinates) : null,
    enabled: !!coordinates,
    refetchInterval: 60000, // Refetch every minute
  });

  const prayerTimes: PrayerTime[] = prayerTimesData 
    ? prayerTimesApi.formatPrayerTimes(prayerTimesData)
    : [];

  return {
    prayerTimes,
    coordinates,
    isLoading,
  };
}
