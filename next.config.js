/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // R2 public URL can be r2.dev or a custom domain chosen later, so allow any https host.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

module.exports = nextConfig;
