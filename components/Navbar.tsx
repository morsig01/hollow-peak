import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-evenly px-6 h-[10vh] bg-black text-white">
                <Link href="/" className="text-xl font-bold">
                    <Image src="/text-logo-white.png" alt="Band Logo" width={200} height={200}/>
                </Link>
            
            <div className="flex items-center space-x-12 text-lg">
                <Link href="/band" className="hover:text-gray-300 transition-colors">
                    Band
                </Link>
                <Link href="/live" className="hover:text-gray-300 transition-colors">
                    Live
                </Link>
                <Link href="/store" className="hover:text-gray-300 transition-colors">
                    Store
                </Link>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">
                    Contact
                </Link>
            </div>
        </nav>
    );
};