export type Release = {
  _id: string
  title: string
  releaseDate: string
  coverArt?: any
  spotifyUrl?: string
  embedUrl: string
  type: 'single' | 'ep' | 'album'
  isLatest: boolean
  albumEmbedUrl?: string // For EP/album Spotify embed
}
