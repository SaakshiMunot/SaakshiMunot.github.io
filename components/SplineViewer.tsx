'use client'

import { useEffect } from 'react'

// Declare the spline-viewer custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url?: string
        class?: string
        style?: React.CSSProperties
        'events-target'?: string
      }
    }
  }
}

interface SplineViewerProps {
  url: string
  className?: string
  style?: React.CSSProperties
}

export function SplineViewer({ url, className, style }: SplineViewerProps) {
  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js'
    script.async = true
    
    document.head.appendChild(script)

    // Add CSS to hide the Spline logo/button
    const style = document.createElement('style')
    style.textContent = `
      spline-viewer {
        --spline-viewer-logo-display: none !important;
      }
      spline-viewer::part(logo) {
        display: none !important;
      }
      spline-viewer #logo,
      spline-viewer a[href*="spline.design"],
      spline-viewer a[href*="spline"],
      spline-viewer .spline-watermark,
      spline-viewer .spline-logo,
      spline-viewer [class*="logo"],
      spline-viewer [class*="watermark"],
      spline-viewer [class*="spline"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `
    document.head.appendChild(style)

    // Use MutationObserver to hide logo after Spline loads
    const observer = new MutationObserver(() => {
      const splineViewers = document.querySelectorAll('spline-viewer')
      splineViewers.forEach(viewer => {
        const shadowRoot = (viewer as any).shadowRoot
        if (shadowRoot) {
          // Target the specific logo element structure
          const logoElements = shadowRoot.querySelectorAll('#logo, a[href*="spline.design"], a[href*="spline"], [class*="logo"], [class*="watermark"], [class*="spline"]')
          logoElements.forEach((el: HTMLElement) => {
            el.style.display = 'none !important'
            el.style.visibility = 'hidden !important'
            el.style.opacity = '0 !important'
            el.remove() // Also remove the element completely
          })
        }
      })
    })
    
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      // Clean up script, style, and observer when component unmounts
      document.head.removeChild(script)
      document.head.removeChild(style)
      observer.disconnect()
    }
  }, [])

  return (
    <spline-viewer 
      url={url}
      class={className}
      style={style}
      events-target="global"
    />
  )
} 