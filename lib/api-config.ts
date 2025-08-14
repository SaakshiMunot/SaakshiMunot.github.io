/**
 * API configuration for different environments
 */

export const getApiBaseUrl = (): string => {
  // In production (GitHub Pages), use the Vercel API URL
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return process.env.NEXT_PUBLIC_API_URL || 'https://your-vercel-deployment.vercel.app';
  }
  
  // In development, use local API
  return '';
};

export const apiEndpoints = {
  chat: `${getApiBaseUrl()}/api/chat`,
  photography: `${getApiBaseUrl()}/api/photography`,
} as const;
