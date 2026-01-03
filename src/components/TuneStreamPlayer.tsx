'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  url: string;
  duration: number;
}

interface TuneStreamPlayerProps {
  track: Track;
  onPlay?: (trackId: string) => void;
  onEnded?: (trackId: string) => void;
  onProgress?: (progress: number) => void;
  autoPlay?: boolean;
  className?: string;
}

export function TuneStreamPlayer({
  track,
  onPlay,
  onEnded,
  onProgress,
  autoPlay = false,
  className = '',
}: TuneStreamPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(track.duration);
  const [volume, setVolume] = useState(1);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      onPlay?.(track.id);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, onPlay, track.id]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    onProgress?.(audioRef.current.currentTime / duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const vol = Number(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    onEnded?.(track.id);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      onPlay?.(track.id);
    }
  }, [autoPlay, onPlay, track.id]);

  return (
    <div className={`tunestream-player ${className}`} style={styles.container}>
      {/* Album Art */}
      <div style={styles.coverContainer}>
        <img
          src={track.coverUrl}
          alt={track.album}
          style={styles.cover}
        />
      </div>

      {/* Track Info */}
      <div style={styles.info}>
        <h3 style={styles.title}>{track.title}</h3>
        <p style={styles.artist}>{track.artist}</p>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <button
          onClick={handlePlayPause}
          style={styles.playButton}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <div style={styles.progressContainer}>
          <span style={styles.time}>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            style={styles.progressBar}
          />
          <span style={styles.time}>{formatTime(duration)}</span>
        </div>

        <div style={styles.volumeContainer}>
          <span>🔊</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
            style={styles.volumeBar}
          />
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#1a1a2e',
    borderRadius: '16px',
    color: 'white',
    maxWidth: '400px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  coverContainer: {
    width: '200px',
    height: '200px',
    marginBottom: '16px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  cover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  info: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 4px 0',
  },
  artist: {
    fontSize: '14px',
    color: '#888',
    margin: 0,
  },
  controls: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  playButton: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#00d4ff',
    cursor: 'pointer',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  progressBar: {
    flex: 1,
    height: '4px',
    accentColor: '#00d4ff',
  },
  time: {
    fontSize: '12px',
    color: '#888',
    minWidth: '40px',
  },
  volumeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  volumeBar: {
    width: '80px',
    height: '4px',
    accentColor: '#00d4ff',
  },
};

export default TuneStreamPlayer;
