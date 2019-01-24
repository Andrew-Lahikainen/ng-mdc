import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',

  entry: {
    textField: path.resolve(__dirname, 'src', 'modules', 'text-field', 'index.ts')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'NgMdc.[name].js',
    library: ['NgMdc', '[name]'],
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.ts', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: [{ loader: 'ts-loader' }]
      }
    ]
  }
};

export default config;
