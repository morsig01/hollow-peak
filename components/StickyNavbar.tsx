'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyNavbar() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 100;
            setIsVisible(show);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed -top-20 left-0 right-0 z-50 m-3 rounded-3xl transform transition-transform duration-500 bg-black/95 text-white ${
            isVisible ? 'translate-y-20' : '-translate-y-full'
        }`}>
            <div className="flex items-center justify-evenly px-6 h-[8vh]">
                <Link href="/" className="text-xl font-bold">
                    <Image src="/text-logo-white.png" alt="Band Logo" width={150} height={150}/>
                </Link>
                
                <div className="flex items-center space-x-12 text-lg">
                    {[
                        { href: '/band', label: 'Band' },
                        { href: '/live', label: 'Live' },
                        { href: '/store', label: 'Store' },
                        { href: '/contact', label: 'Contact' }
                    ].map(({ href, label }) => (
                        <Link 
                            key={href}
                            href={href} 
                            className={`hover:text-gray-300 transition-colors ${pathname === href ? 'border-b-2' : ''}`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}