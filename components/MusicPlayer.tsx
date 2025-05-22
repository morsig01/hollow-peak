'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { SkipBack, SkipForward, Play, Pause } from 'lucide-react'

interface Release {
  title: string
  coverArt: any
  embedUrl?: string
  albumEmbedUrl?: string
  type: 'single' | 'ep' | 'album'
  releaseDate: string
}

export default function MusicPlayer({ release }: { release: Release }) {  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  useEffect(() => {
    setMounted(true)
    // Set initial track title for singles
    if (release.type === 'single') {
      setCurrentTrack(release.title)
    }
    const handleSpotifyMessage = (event: MessageEvent) => {
      if (
        event.data &&
        typeof event.data === 'object' &&
        'type' in event.data &&
        event.data.type === 'playback_update' &&
        'data' in event.data &&
        typeof event.data.data === 'object' &&
        event.data.data &&
        'isPlaying' in event.data.data
      ) {
        setIsPlaying(!!event.data.data.isPlaying)
      }
    }

    window.addEventListener('message', handleSpotifyMessage)
    

    return () => {
      window.removeEventListener('message', handleSpotifyMessage)
    }
  }, [])

  const sendMessage = (command: string) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ command }, '*')
    }
  }

  const handlePlayPause = () => {
    sendMessage(isPlaying ? 'pause' : 'play')
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    sendMessage('prev')
  }

  const handleNext = () => {
    sendMessage('next')
  }

  if (!mounted) {
    return (
      <div className="w-full h-[380px] bg-neutral-900 animate-pulse rounded-lg">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-neutral-500">Loading player...</div>
        </div>
      </div>
    )
  }

  const isAlbumOrEP = release.type === 'album' || release.type === 'ep'
  const embedHeight = isAlbumOrEP ? '380' : '152'
  const embedType = isAlbumOrEP ? 'album' : 'track'
  const embedId = isAlbumOrEP ? release.albumEmbedUrl : release.embedUrl

  console.log('Release type:', release.type)
  console.log('Album embed URL:', release.albumEmbedUrl)
  console.log('Track embed URL:', release.embedUrl)
  console.log('Using embed type:', embedType)
  console.log('Using embed ID:', embedId)

  if (!embedId) {
    return (
      <div className="w-[400px] bg-neutral-900/50 backdrop-blur-sm p-8 rounded-lg">
        <div className="text-neutral-500 text-center">
          <p>No playback URL available.</p>
          <p className="text-sm mt-2">
            {isAlbumOrEP 
              ? "Please add the Album/EP ID from Spotify (the part after 'album/' in the share URL)" 
              : "Please add the Track ID from Spotify (the part after 'track/' in the share URL)"}
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="w-[400px] bg-neutral-900/50 backdrop-blur-sm p-8 rounded-lg flex flex-col items-center">
      {/* Album Cover */}
      <div className="w-full aspect-square mb-8 relative">
        {release.coverArt ? (
          <Image
            src={urlFor(release.coverArt).url()}
            alt={release.title}
            fill
            className="rounded-lg shadow-lg object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 rounded-lg flex items-center justify-center">
            <span className="text-neutral-500">album cover</span>
          </div>
        )}
      </div>      {/* Album Title & Current Song */}
      <div className="w-full mb-8 space-y-2">
        {/* Album Title - Static */}
        <h2 className="text-lg font-medium text-neutral-400 text-center">
          {release.title}
        </h2>
        {/* Current Song - Truncated with ellipsis */}
        <div className="overflow-hidden relative group">
          <div className="max-w-full">
            <h3 className="text-xl font-medium text-white text-center truncate group-hover:text-clip group-hover:whitespace-normal">
              {currentTrack || (release.type === 'single' ? release.title : 'Select a track')}
            </h3>
          </div>
        </div>
      </div>{/* Custom Player Controls */}      <div className="flex items-center justify-center gap-8">
        <button 
          onClick={handlePrevious}
          className="text-white hover:text-neutral-400 transition-colors p-2" 
          aria-label="Previous"
        >
          <SkipBack size={32} />
        </button>
        <button 
          onClick={handlePlayPause}
          className="text-white hover:text-neutral-400 transition-colors p-2" 
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button 
          onClick={handleNext}
          className="text-white hover:text-neutral-400 transition-colors p-2" 
          aria-label="Next"
        >
          <SkipForward size={32} />
        </button>
      </div>

      {/* Hidden Spotify Player */}
      <div className="hidden">
        <iframe
          ref={iframeRef}
          src={`https://open.spotify.com/embed/${embedType}/${embedId}?utm_source=generator`}
          width="100%"
          height={embedHeight}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="w-full"
        />
      </div>
    </div>
  )
}
