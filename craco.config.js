const CracoLessPlugin = require('craco-less');
const LambdaThemes = require('./src/assets/GlobalStyleThemes');

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
