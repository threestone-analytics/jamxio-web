const path = require('path');

module.exports = {
  entry: [path.join(__dirname, '../src/index.js')],
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.ico', '.sass', '.jsx', '.png', '.jpg'],
    alias: {
      Components: path.join(__dirname, '../src/components/'),
      Containers: path.join(__dirname, '../src/containers/'),
      Utils: path.join(__dirname, '../src/utils')
    }
  }
};
