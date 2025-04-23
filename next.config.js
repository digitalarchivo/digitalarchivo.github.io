// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for GitHub Pages and static deployments
  // For GitHub Pages, you'll need this if deploying to a custom domain
  // basePath: '/your-repo-name',
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig
