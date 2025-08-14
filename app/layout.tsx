import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Navbar } from "@/components/Navbar"
import { Providers } from './providers'
import { ThemeProvider } from '@/components/ThemeProvider'
import { FloatingThemeToggle } from '@/components/FloatingThemeToggle'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Saakshi Munot',
  description: 'Portfolio website of Saakshi Munot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
    <html lang="en" className="theme-red">
 
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <div className="no-scrollbar min-h-screen">
                <Navbar />
                {children}
                <Footer />
                <FloatingThemeToggle />
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
