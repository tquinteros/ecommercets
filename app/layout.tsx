import Header from '@/src/components/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/redux/provider'
const inter = Inter({ subsets: ['latin'] })
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Clothes Web',
  description: 'Created by TQuinteros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        <ReduxProvider>
          <Header />
          {children}
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  )
}
