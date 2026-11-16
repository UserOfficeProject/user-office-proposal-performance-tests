import { join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import GlobEntries from 'webpack-glob-entries';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testName = process.env.K6_TEST_NAME;
const entry = testName
  ? GlobEntries(`./src/**/${testName}.ts`)
  : GlobEntries('./src/**/*test*.ts');

export default {
  mode: 'production',
  entry,
  experiments: {
    outputModule: true,
  },
  output: {
    path: join(__dirname, 'test'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  stats: {
    colors: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: testName ? [`${testName}.js`] : ['**/*'],
    }),
  ],
  optimization: {
    minimize: false,
  },
};
