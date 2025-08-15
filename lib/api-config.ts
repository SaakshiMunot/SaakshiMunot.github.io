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
    
    // In production (GitHub Pages), use the Vercel API URL
    // First check environment variable, then fall back to default
    return process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-jade-five-30.vercel.app';
  }
  
  // Server-side fallback
  return process.env.NEXT_PUBLIC_API_URL || '';
};

export const apiEndpoints = {
  chat: `${getApiBaseUrl()}/api/chat`,
  photography: `${getApiBaseUrl()}/api/photography`,
} as const;
