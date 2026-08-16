import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import NavigationBar from '@/components/blocks/NavigationBar'
import Providers from './providers'

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  description: 'Real State',
  title: 'Real State',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${roboto.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>
          <NavigationBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
