import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const poppins = Poppins({ subsets: ['latin'],weight:['300', '400','500','600','700'] })

export const metadata: Metadata = {
  title: 'StayHub',
  description: 'Your traveling partner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white/90`}>
        <Header />
        <div className='w-full border-b-2 fixed top-[4.3rem] md:top-[5rem] z-50'/>
        {children}
        <div className='w-full border-b-2 fixed bottom-[3.3rem] md:bottom-[2.7rem] z-50'/>
        <Footer />
      </body>
    </html>
  )
}