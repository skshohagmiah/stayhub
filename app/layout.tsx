import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchModal from '@/components/SearchModal'
import ListingModal from '@/components/LIstingModal'
import SignInModal from '@/components/SignInModal'
import { getCurrentSession } from '@/libs/getCurrentUser'

const poppins = Poppins({ subsets: ['latin'],weight:['300', '400','500','600','700'] })

export const metadata: Metadata = {
  title: 'StayHub',
  description: 'Your traveling partner',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentSession();
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white/90`}>
        <SignInModal />
        <SearchModal />
        <ListingModal session= {session} />
        <Header />
        <div className='w-full border-b-2 fixed top-[4.3rem] md:top-[5rem] z-[45]'/>
        {children}
        <Footer />
      </body>
    </html>
  )
}
