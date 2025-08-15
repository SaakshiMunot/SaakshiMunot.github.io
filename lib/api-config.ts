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
    // This should be set as NEXT_PUBLIC_API_URL in GitHub repository variables
    // The URL should be your actual Vercel deployment URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      console.error('NEXT_PUBLIC_API_URL not configured. Please set it in GitHub repository variables.');
      return 'https://saakshi-munot-github-o1231eop9-saakshimunots-projects.vercel.app'; // Fallback to actual Vercel deployment
    }
    
    return apiUrl;
  }
  
  // Server-side fallback
  return process.env.NEXT_PUBLIC_API_URL || 'https://saakshi-munot-github-o1231eop9-saakshimunots-projects.vercel.app';
};

export const apiEndpoints = {
  chat: `${getApiBaseUrl()}/api/chat`,
  photography: `${getApiBaseUrl()}/api/photography`,
} as const;
