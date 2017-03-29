const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin'); //VSCode Only

// const imagemin = require('imagemin');
// const imageminGuetzli = require('imagemin-guetzli');

const PATHS = {
    //react: path.join(__dirname, 'node_modules/react/dist/react.min.js'),
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};


module.exports = {
    //context : path.resolve(__dirname, './src'),
    entry: {
        app: './src/assets/js/app.js',
        about: './src/assets/js/about.js',
        vendor: ['jquery', 'bootstrap-loader']
    },
    output: {
        path: PATHS.dist,
        filename: './assets/js/[name].min.js'
    },
    //devtool : 'source-map',
    resolve: {
        modules: ['node_modules'],
        alias: {
            jquery: 'jquery/src/jquery',
            owlcss: 'owl.carousel/dist/assets/owl.carousel.css'
        }
    },
    module: {
        rules: [

            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader"
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer', {
                                            browsers: ['last 2 versions', 'ie >= 9']
                                        })
                                    ];
                                }
                            }
                        },

                        {
                            loader: "resolve-url-loader"
                        },

                        {
                            loader: "sass-loader"
                        }

                        
                    ],
                    fallback: "style-loader"
                })
            },


            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                use: 'imports-loader?jQuery=jquery'
            },


            // {
            //     test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
            //     use: 'url-loader?limit=10000&name=./assets/fonts/[name].[ext]'
            // },


            {
                test: /\.svg$/,
                exclude: [path.resolve(__dirname, "./src/assets/images")],
                use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/'
            },
            { test: /\.ttf$/, use: 'url-loader?limit=10000&mimetype=application/x-font-ttf&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/' },
            { test: /\.otf$/, use: 'url-loader?limit=10000&mimetype=application/x-font-opentype&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/' },
            { test: /\.woff$/, use: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/' },
            { test: /\.woff2$/, use: 'url-loader?limit=10000&mimetype=application/font-woff2&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/' },
            { test: /\.eot$/, use: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/' },
            { test: /\.sfnt$/, use: 'url-loader?limit=10000&mimetype=application/font-sfnt&name=[name].[ext]&publicPath=../fonts/&outputPath=./assets/fonts/' },


            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                exclude: [
                    path.resolve(__dirname, "./src/assets/fonts")
                ],
                use: "file-loader?name=./assets/images/[name].[ext]"
            }

        ]
    },
    devServer: {
        contentBase: PATHS.dist,
        compress: true,
        port: 8080,
        stats: 'errors-only',
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        new HtmlWebpackPlugin({
            title: 'Webpack Test E25',
            // minify : {
            //     collapseWhitespace : true
            // },
            hash: true,
            chunks: ['vendor', 'app'],
            template: './src/index.html'
        }),

        new HtmlWebpackPlugin({ 
            filename: 'about.html',
            title: 'Webpack Test E25 Contact',
            hash: true,
            chunks: ['vendor', 'about'],
            template: './src/about.html'
        }),
        


        new ExtractTextPlugin({
            filename: './assets/css/[name].min.css',
            disable: false,
            allChunks: true
        }),

        // new imagemin(['images/*.{png,jpg}'], 'build/images', {
        //     use: [
        //         imageminGuetzli({quality: 95})
        //     ]
        // }).then(() => {
        //     console.log('Images optimized');
        // }),

        new BitBarWebpackProgressPlugin()
    ]
}