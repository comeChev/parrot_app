/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kltsfkerfavqxldetdqc.supabase.co",
      },
    ],
  },
};
module.exports = nextConfig;
