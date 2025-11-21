const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "igtf-media.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
