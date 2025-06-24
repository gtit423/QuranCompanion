import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { quranApi, reciters } from "@/lib/quranApi";

interface AudioPlayerProps {
  surahNumber: number;
}

export function AudioPlayer({ surahNumber }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedReciter, setSelectedReciter] = useState("ahmad_huth");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", () => setIsPlaying(false));

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", () => setIsPlaying(false));
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const audioUrl = quranApi.getAudioUrl(selectedReciter, surahNumber);
      console.log('Loading audio:', audioUrl);
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [selectedReciter, surahNumber]);

  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          console.log('Attempting to play audio:', audioRef.current.src);
          // Ensure audio is loaded before playing
          audioRef.current.load();
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        // Try alternative URL format
        setIsPlaying(false);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player rounded-lg p-4">
      <audio ref={audioRef} preload="metadata" />
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-reverse space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            className="text-white hover:text-[hsl(51,100%,42%)] hover:bg-transparent"
          >
            <i className={`fas fa-${isPlaying ? "pause" : "play"} text-2xl`}></i>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-[hsl(51,100%,42%)] hover:bg-transparent"
          >
            <i className="fas fa-backward text-lg"></i>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-[hsl(51,100%,42%)] hover:bg-transparent"
          >
            <i className="fas fa-forward text-lg"></i>
          </Button>
        </div>
        
        <div className="text-sm flex items-center space-x-reverse space-x-2">
          <span className="text-[hsl(51,100%,42%)]">القارئ:</span>
          <Select value={selectedReciter} onValueChange={setSelectedReciter}>
            <SelectTrigger className="w-40 bg-transparent border-none text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {reciters.map((reciter) => (
                <SelectItem key={reciter.id} value={reciter.id}>
                  {reciter.arabicName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-1">
        <div 
          className="bg-[hsl(51,100%,42%)] h-2 rounded-full transition-all"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-[hsl(51,100%,42%)]">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
