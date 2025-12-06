import { useEffect, useRef } from "react";

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playMusic = () => {
      audio.volume = 0.4;
      audio.play().catch(() => {});
    };

    // Try autoplay
    playMusic();

    // Fallback: play on first click anywhere
    window.addEventListener("click", playMusic, { once: true });

    return () => window.removeEventListener("click", playMusic);
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/cp-birthday/music/Ve Haaniyaan.mp3" type="audio/mp3" />
    </audio>
  );
};
