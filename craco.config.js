const CracoLessPlugin = require('craco-less');
const LambdaThemes = require('./src/styles/GlobalStyleThemes');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: LambdaThemes,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
