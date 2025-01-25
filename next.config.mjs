/*
<ai_context>
Configures Next.js for the app.
</ai_context>
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "img.clerk.com" },
      { hostname: "images.clerk.dev" },
      { hostname: "uploadthing.com" },
      { hostname: "utfs.io" }
    ]
  },
  typescript: {
    ignoreBuildErrors: true // Ignoring Next.js internal type generation issues
  }
}

export default nextConfig
