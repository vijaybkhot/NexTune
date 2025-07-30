import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/graphql",
            destination: "http://server:4000/graphql",
          },
        ]
      : [];
  },
};

export default nextConfig;
