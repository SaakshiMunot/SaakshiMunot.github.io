/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
  
  // Only enable static export for GitHub Pages builds
  // Vercel builds will use default settings (SSR/API routes enabled)
  ...(process.env.BUILD_MODE === 'static' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
      domains: ['prod.spline.design'],
    },
  }),
  
  // Default configuration for Vercel (when BUILD_MODE !== 'static')
  ...((process.env.BUILD_MODE !== 'static') && {
    images: {
      domains: ['prod.spline.design'],
    },
  }),
}

export default nextConfig