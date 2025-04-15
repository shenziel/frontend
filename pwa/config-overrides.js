const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = function override(config) {
  // Find and replace the default `GenerateSW` plugin with `InjectManifest`
  const workboxPluginIndex = config.plugins.findIndex(
    (plugin) => plugin.constructor.name === 'GenerateSW'
  );

  if (workboxPluginIndex !== -1) {
    config.plugins[workboxPluginIndex] = new InjectManifest({
      swSrc: './src/service-worker.js', // Path to your custom service worker
      swDest: 'service-worker.js',     // Output service worker file
    });
  }

  return config;
};