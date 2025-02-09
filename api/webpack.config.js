const { composePlugins, withNx } = require('@nx/webpack');
const path = require('path');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Ensure the assets are copied to the output directory
  config.output = {
    ...config.output,
    path: path.join(__dirname, '../dist/api'),
  };
  
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});
