'use client'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    
    return (
        <nav className="flex items-center justify-evenly px-6 h-[10vh] bg-black text-white">
            <Link href="/" className="text-xl font-bold">
                <Image src="/text-logo-white.png" alt="Band Logo" width={200} height={200}/>
            </Link>
            
            <div className="flex items-center space-x-12 text-lg">
                <Link href="/band" className={`hover:text-gray-300 transition-colors ${pathname === '/band' ? 'border-b-2' : ''}`}>
                    Band
                </Link>
                <Link href="/live" className={`hover:text-gray-300 transition-colors ${pathname === '/live' ? 'border-b-2' : ''}`}>
                    Live
                </Link>
                <Link href="/store" className={`hover:text-gray-300 transition-colors ${pathname === '/store' ? 'border-b-2' : ''}`}>
                    Store
                </Link>
                <Link href="/contact" className={`hover:text-gray-300 transition-colors ${pathname === '/contact' ? 'border-b-2' : ''}`}>
                    Contact
                </Link>
            </div>
        </nav>
    );
};