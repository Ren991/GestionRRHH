import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Reemplaza esto con la URL exacta que ves en tu navegador
      allowedOrigins: [
        "probable-carnival-5p56wr5wjpxh4jrr-3000.app.github.dev",
        "localhost:3000"
      ],
    },
  },
};

export default nextConfig;
