const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/, // Match all `.svg` files
      use: ["@svgr/webpack"], // Use the `@svgr/webpack` loader
    });
    return config; // Return the updated Webpack config
  },
};

export default nextConfig;
