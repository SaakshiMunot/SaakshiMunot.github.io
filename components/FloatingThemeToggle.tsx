'use client'

import { useState } from 'react'
import { Palette, Check } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { cn } from '@/lib/utils'

const themes = [
  { id: 'red', name: 'Red', color: '#ef4444' },
  { id: 'blue', name: 'Blue', color: '#3b82f6' },
  { id: 'green', name: 'Green', color: '#10b981' },
  { id: 'purple', name: 'Purple', color: '#8b5cf6' },
  { id: 'orange', name: 'Orange', color: '#f97316' },
  { id: 'pink', name: 'Pink', color: '#ec4899' },
  { id: 'teal', name: 'Teal', color: '#14b8a6' },
] as const

export function FloatingThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="floating-theme-toggle bg-card/80 backdrop-blur-sm border border-border text-foreground/80 hover:text-primary transition-all duration-300 p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 hover:bg-card"
          title="Change theme"
        >
          <Palette size={28} />
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Theme dropdown */}
            <div className="absolute bottom-full right-0 mb-3 w-56 bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-2xl z-50 py-3">
              <div className="px-3 pb-2 border-b border-border/50">
                <h3 className="text-sm font-medium text-foreground/80">Choose Theme</h3>
              </div>
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-accent/50 transition-colors duration-200",
                    theme === themeOption.id ? "bg-accent/20" : ""
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-border shadow-sm"
                      style={{ backgroundColor: themeOption.color }}
                    />
                    <span className="text-foreground font-medium">{themeOption.name}</span>
                  </div>
                  {theme === themeOption.id && (
                    <Check size={18} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
