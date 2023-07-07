/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "npjubydgpvkpzdksfdce.supabase.co",
      },
    ],
  },
};
module.exports = nextConfig;
