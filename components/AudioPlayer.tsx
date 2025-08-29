"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  src: string;
  title: string;
  duration?: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onEnded?: () => void;
}

export default function AudioPlayer({ 
  src, 
  title, 
  duration, 
  isPlaying, 
  onPlayPause,
  onEnded 
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync play/pause with prop
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setTotalDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => {
      onEnded?.();
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', () => setIsLoading(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', () => setIsLoading(false));
    };
  }, [onEnded]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * totalDuration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(totalDuration, currentTime + seconds));
    }
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-[#0D9488] to-[#002C3E] rounded-xl p-6 text-white">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Header */}
      <div className="mb-6">
        <h4 className="font-heading text-lg font-bold mb-1 truncate">
          🎧 {title}
        </h4>
        <p className="text-white/80 text-sm">
          {isLoading ? "Loading..." : "Coreledger Tech Podcast"}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div 
          className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative group"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-white rounded-full transition-all duration-200 group-hover:bg-white/90"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>
        <div className="flex justify-between text-sm text-white/80 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{totalDuration ? formatTime(totalDuration) : duration || "0:00"}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
            onClick={() => skip(-15)}
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="w-12 h-12 rounded-full bg-white text-[#0D9488] hover:bg-white/90 p-0"
            onClick={onPlayPause}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#0D9488]/30 border-t-[#0D9488] rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
            onClick={() => skip(15)}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 text-white/80 hover:text-white"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}
