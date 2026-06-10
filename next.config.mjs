/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Load these packages from node_modules at runtime instead of bundling them.
  // pdf-parse / pdfjs-dist resolve a worker file at runtime that the bundler
  // cannot trace, so they must stay external on the server.
  serverExternalPackages: ['pdf-parse', 'pdfjs-dist', '@napi-rs/canvas'],
}

export default nextConfig
