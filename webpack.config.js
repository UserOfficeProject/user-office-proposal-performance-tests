import { join } from 'path';
import { resolve as _resolve } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import GlobEntries from 'webpack-glob-entries';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: GlobEntries('./src/**/*test*.ts'),
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
  target: 'node',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  stats: {
    colors: true,
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: false,
  },
};
