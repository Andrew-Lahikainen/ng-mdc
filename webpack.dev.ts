import { Configuration } from 'webpack';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CustomRenderer } from './markdown.config';
import { MarkedOptions } from 'marked';

const config: Configuration = {
  mode: 'development',

  entry: resolve(__dirname, 'demo', 'index.ts'),

  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, 'dist')
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    port: 8080,
    historyApiFallback: true,
    publicPath: '/',
    open: true
  },

  resolve: {
    extensions: ['.js', '.ts', '.scss', '.html'],
    modules: [resolve(__dirname, 'node_modules'), resolve(__dirname, 'src')]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, 'demo', 'index.html')
    })
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: { loader: 'ts-loader' }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer()] }
          },
          {
            loader: 'sass-loader',
            options: { includePaths: [resolve(__dirname, 'node_modules')] }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader?exportAsEs6Default' }]
      },
      {
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          {
            loader: 'markdown-loader',
            options: {
              gfm: true,
              renderer: CustomRenderer
            } as MarkedOptions
          }
        ]
      }
    ]
  }
};

export default config;
