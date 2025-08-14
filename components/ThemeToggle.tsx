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

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground/80 hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-primary/10"
        title="Change theme"
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Theme dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 py-2">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => {
                  setTheme(themeOption.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-accent/50 transition-colors duration-200",
                  theme === themeOption.id ? "bg-accent/20" : ""
                )}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: themeOption.color }}
                  />
                  <span className="text-foreground">{themeOption.name}</span>
                </div>
                {theme === themeOption.id && (
                  <Check size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
