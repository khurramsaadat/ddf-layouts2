import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure static files are properly handled
  trailingSlash: false,
  
  // Optimize for deployment
  poweredByHeader: false,
  
  // Ensure Excel files are served correctly
  async headers() {
    return [
      {
        source: '/(.*\\.xlsx)',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
