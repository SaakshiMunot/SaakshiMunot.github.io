/**
 * API configuration for different environments
 */

export const getApiBaseUrl = (): string => {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // In development, use local API
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return '';
    }
    
    // Check if we're on the main Vercel domain (latest deployment)
    if (window.location.hostname.includes('saakshi-munot-github-io.vercel.app')) {
      // We're on the main Vercel domain, use current origin
      return window.location.origin;
    }
    
    // Check if we're on a specific Vercel deployment
    if (window.location.hostname.includes('saakshi-munot-github') && window.location.hostname.includes('vercel.app')) {
      // We're on a specific Vercel deployment, use current origin
      return window.location.origin;
    }
    
    // For GitHub Pages or other deployments, use the configured API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      // Fallback: try to determine the latest Vercel URL dynamically
      console.warn('NEXT_PUBLIC_API_URL not configured. Using main Vercel domain as fallback.');
      return 'https://saakshi-munot-github-io.vercel.app';
    }
    
    return apiUrl;
  }
  
  // Server-side fallback
  return process.env.NEXT_PUBLIC_API_URL || 'https://saakshi-munot-github-io.vercel.app';
};

// Normalize base URL (remove trailing slashes) and safely join paths
const normalizeBaseUrl = (url: string): string => url.replace(/\/+$/g, '');
const joinUrl = (base: string, path: string): string => {
  const normalizedBase = normalizeBaseUrl(base || '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

const API_BASE = normalizeBaseUrl(getApiBaseUrl());

export const apiEndpoints = {
  chat: joinUrl(API_BASE, '/api/chat'),
  photography: joinUrl(API_BASE, '/api/photography'),
} as const;
