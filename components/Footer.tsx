import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link href="/band" className="hover:text-gray-300">Band</Link></li>
              <li><Link href="/live" className="hover:text-gray-300">Live</Link></li>
              <li><Link href="/store" className="hover:text-gray-300">Store</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="flex space-x-6">
              <li><a href="https://open.spotify.com/artist/1R1117YKWnz7oNMbUlJZnP" className="hover:text-gray-300"><img src="/icons/spotify.svg" alt="Spotify" width={24} height={24} /></a></li>
              <li><a href="https://www.instagram.com/hollowpeakband/" className="hover:text-gray-300"><img src="/icons/instagram.svg" alt="Instagram" width={24} height={24} /></a></li>
              <li><a href="https://www.youtube.com/@HollowPeak" className="hover:text-gray-300"><img src="/icons/youtube.svg" alt="YouTube" width={24} height={24} /></a></li>
              <li><a href="https://www.tiktok.com/@hollowpeakband" className="hover:text-gray-300"><img src="/icons/tiktok.svg" alt="TikTok" width={24} height={24} /></a></li>
              <li><a href="https://www.facebook.com/profile.php?id=100091543082236" className="hover:text-gray-300"><img src="/icons/facebook.svg" alt="Facebook" width={24} height={24} /></a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hollow Peak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}