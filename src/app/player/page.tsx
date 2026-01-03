'use client';

import { useState, useEffect } from 'react';
import TuneStreamPlayer from '@/components/TuneStreamPlayer';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  url: string;
  duration: number;
}

export default function PlayerPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/api/music?limit=10');
        const data = await res.json();
        if (data.success) {
          setTracks(data.data.tracks);
          if (data.data.tracks.length > 0) {
            setCurrentTrack(data.data.tracks[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching tracks:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();
  }, []);

  const handlePlay = async (trackId: string) => {
    try {
      await fetch(`/api/music/${trackId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'play' }),
      });
    } catch (err) {
      console.error('Error tracking play:', err);
    }
  };

  const handleEnded = (trackId: string) => {
    const currentIndex = tracks.findIndex(t => t.id === trackId);
    if (currentIndex < tracks.length - 1) {
      setCurrentTrack(tracks[currentIndex + 1]);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Cargando...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>TuneStream</h1>
        <p style={styles.subtitle}>Educación Musical NewCool</p>
      </header>

      <main style={styles.main}>
        {currentTrack && (
          <TuneStreamPlayer
            track={currentTrack}
            onPlay={handlePlay}
            onEnded={handleEnded}
          />
        )}

        <div style={styles.playlist}>
          <h2 style={styles.playlistTitle}>Playlist</h2>
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setCurrentTrack(track)}
              style={{
                ...styles.trackItem,
                backgroundColor: currentTrack?.id === track.id ? '#2a2a4e' : 'transparent',
              }}
            >
              <img src={track.coverUrl} alt={track.album} style={styles.trackCover} />
              <div style={styles.trackInfo}>
                <span style={styles.trackTitle}>{track.title}</span>
                <span style={styles.trackArtist}>{track.artist}</span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f0f1a',
    color: 'white',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '18px',
  },
  header: {
    padding: '20px',
    textAlign: 'center',
    borderBottom: '1px solid #2a2a4e',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0,
    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    margin: '4px 0 0 0',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    gap: '40px',
  },
  playlist: {
    width: '100%',
    maxWidth: '400px',
  },
  playlistTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  trackItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '8px',
    textAlign: 'left',
    color: 'white',
  },
  trackCover: {
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    objectFit: 'cover',
  },
  trackInfo: {
    marginLeft: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
  trackTitle: {
    fontSize: '14px',
    fontWeight: '500',
  },
  trackArtist: {
    fontSize: '12px',
    color: '#888',
  },
};
