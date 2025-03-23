import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative w-full h-[90vh] overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/facebook-banner.jpg"
          alt="Band Photo"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      <div className="relative z-10 h-[90vh] w-80 bg-black/80 ml-40 flex flex-col items-center justify-center space-y-20">
        <Image src="/logo-white.png" alt="Band Logo" width={200} height={200} className="mb-12" />
        
        <div className="flex flex-row space-x-6">
          <Link href="https://spotify.com/artist/xxx" className="text-gray-300 hover:text-white transition-colors">
            <Image src="/icons/spotify.svg" alt="Spotify" width={32} height={32} />
          </Link>
          <Link href="https://youtube.com/xxx" className="text-gray-300 hover:text-white transition-colors">
            <Image src="/icons/youtube.svg" alt="YouTube" width={32} height={32} />
          </Link>
          <Link href="https://tiktok.com/xxx" className="text-gray-300 hover:text-white transition-colors">
            <Image src="/icons/tiktok.svg" alt="Twitter" width={32} height={32} />
          </Link>
          <Link href="https://instagram.com/xxx" className="text-gray-300 hover:text-white transition-colors">
            <Image src="/icons/instagram.svg" alt="Instagram" width={32} height={32} />
          </Link>
          <Link href="https://facebook.com/xxx" className="text-gray-300 hover:text-white transition-colors">
            <Image src="/icons/facebook.svg" alt="Facebook" width={32} height={32} />
          </Link>
        </div>
      </div>
    </main>
  );
}
