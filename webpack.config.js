const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const CopyPlugin = require('copy-webpack-plugin');
//@ts-ignore
var Visualizer = require('webpack-visualizer-plugin');

const styledComponentsTransformer = createStyledComponentsTransformer({ ssr: false });
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      //webpack-ant-icon-loader should be removed when antd 4 is released
      {
        loader: 'webpack-ant-icon-loader',
        enforce: 'pre',
        options: {
          chunkName: 'antd-icons'
        },
        include: [require.resolve('@ant-design/icons/lib/dist')]
      },
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
          }
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name]-[hash].[ext]', outputPath: 'assets' }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {}
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new webpack.ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${['en'].join('|')})[/\\\\\]`) // keeps only english locale for date-fns
    ),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      RUNTIME_ENV: 'local_dev'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyPlugin([{ from: 'src/favicon*.*', flatten: true }]),
    new Visualizer()
  ],
  optimization: {
    namedModules: true,
    splitChunks: {
      //chunks: 'all'
      chunks: function(chunk) {
        return chunk.name !== 'antd-icons';
      }
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3001,
    historyApiFallback: true
  }
};
