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
  // Enable static export for GitHub Pages
  output: process.env.BUILD_MODE === 'static' ? 'export' : undefined,
  trailingSlash: process.env.BUILD_MODE === 'static' ? true : false,
  // Configure images for both static export and normal mode
  images: {
    unoptimized: process.env.BUILD_MODE === 'static' ? true : false,
    domains: ['prod.spline.design'],
  },
}

export default nextConfig