'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('red')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    
    // Remove all existing theme classes
    root.classList.remove('theme-red', 'theme-blue', 'theme-green', 'theme-purple', 'theme-orange', 'theme-pink', 'theme-teal')
    
    // Add current theme class
    root.classList.add(`theme-${theme}`)
    
    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
