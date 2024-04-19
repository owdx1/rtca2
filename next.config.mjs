/** @type {import('next').NextConfig} */

const nextConfig = {
  //reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "avatars.githubusercontent.com"
    ], 
  },
  experimental: {
    swcPlugins:[
      ["next-superjson-plugin", {}]
    ]
  }
};

export default nextConfig;
