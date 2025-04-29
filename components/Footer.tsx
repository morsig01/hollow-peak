import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Links */}
          <div className='border-r border-gray-800 pr-4'>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link href="/band" className="hover:text-gray-300">Band</Link></li>
              <li><Link href="/music" className="hover:text-gray-300">Music</Link></li>
              <li><Link href="/tour" className="hover:text-gray-300">Tour</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="https://spotify.com" className="hover:text-gray-300">Spotify</a></li>
              <li><a href="https://instagram.com" className="hover:text-gray-300">Instagram</a></li>
              <li><a href="https://twitter.com" className="hover:text-gray-300">Twitter</a></li>
              <li><a href="https://youtube.com" className="hover:text-gray-300">YouTube</a></li>
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