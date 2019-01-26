import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import { Configuration } from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const config: Configuration = {
  mode: 'production',

  entry: {
    textField: resolve(__dirname, 'src', 'modules', 'text-field', 'index.ts')
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'NgMdc.[name].js',
    library: ['NgMdc', '[name]'],
    libraryTarget: 'umd',
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]'
  },

  resolve: {
    extensions: ['.js', '.ts', '.scss'],
    modules: [resolve(__dirname, 'node_modules'), resolve(__dirname, 'src')]
  },

  plugins: [
    new CleanWebpackPlugin([resolve(__dirname, 'dist')]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: resolve(__dirname, 'src'),
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.scss$/,
        include: resolve(__dirname, 'src'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader as string
          },
          {
            loader: 'css-loader',
            options: { minimize: true }
          },
          {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer()] }
          },
          {
            loader: 'sass-loader',
            options: {
              precision: 10,
              includePaths: [resolve(__dirname, 'node_modules')]
            }
          }
        ]
      }
    ]
  }
};

export default config;
