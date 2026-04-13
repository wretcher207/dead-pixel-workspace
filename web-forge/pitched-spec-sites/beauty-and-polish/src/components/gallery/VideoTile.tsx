"use client";

import { useRef, useState } from "react";

interface VideoTileProps {
  src: string;
  className?: string;
}

export default function VideoTile({ src, className = "" }: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-[24px] shadow-clay-card ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <button
        onClick={togglePlay}
        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-clay-foreground shadow-clay-button backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
        ) : (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
    </div>
  );
}
