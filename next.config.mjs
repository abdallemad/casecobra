/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        hostname:'utfs.io',
        protocol:'https'
      }
    ]
  },
  reactStrictMode:true,
  typescript:{
    ignoreBuildErrors:true
  }
};

export default nextConfig;
