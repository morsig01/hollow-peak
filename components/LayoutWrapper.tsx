'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import StickyNavbar from './StickyNavbar'
import FooterWrapper from './FooterWrapper'
import SmoothScroll from './SmoothScroll'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideLayout = pathname.startsWith('/studio')

  if (hideLayout) return <>{children}</>

  return (
    <>
      <Navbar />
      <StickyNavbar />
      <SmoothScroll>{children}</SmoothScroll>
      <FooterWrapper />
    </>
  )
}
