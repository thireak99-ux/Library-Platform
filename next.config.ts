import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "covers.openlibrary.org", pathname: "/b/**" }],
  },
};

export default nextConfig;
