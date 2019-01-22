const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

module.exports = (env, argv) => {
    // argv.mode is the only one that works 
    // https://github.com/webpack/webpack/issues/6460
    const isDevBuild = process.env.NODE_ENV !== 'production' && 
        process.env.WEBPACK_MODE !== 'production' &&
        argv.mode !== 'production';

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({        
        stats: { modules: false },
        resolve: {
            alias: {
                assets: `${path.join(__dirname, "src")}/assets/`,
                actions: `${path.join(__dirname, "src")}/actions/`,
                components: `${path.join(__dirname, "src")}/components/`,
                constants: `${path.join(__dirname, "src")}/constants`,
                configuration: `${path.join(__dirname, "src")}/configuration/`,
                config: `${path.join(__dirname, "src")}/config/${this.env}.js`,
                containers: `${path.join(__dirname, "src")}/containers/`,
                localization: `${path.join(__dirname, "src")}/localization/`,
                services: `${path.join(__dirname, "src")}/services/`,
                restClient: `${path.join(__dirname, "src")}/services/RestClient/`,
                deliverStatApi: `${path.join(__dirname, "src")}/services/DeliverStatApi/`,
                reducers: `${path.join(__dirname, "src")}/reducers/`,
                app: `${path.join(__dirname, "src")}/app/`,
                styles: `${path.join(__dirname, "src")}/styles/`,
                util: `${path.join(__dirname, "src")}/util/`,
                views: `${path.join(__dirname, "src")}/views/`
            },
            //root: __dirname,
            extensions: ['.js', '.jsx'],
            modules: [
                path.join(__dirname, 'node_modules'),
                path.join(__dirname, "src")
            ]
        },
        output: {
            filename: '[name].js',
            publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff2|woff|ttf|eot)$/,
                    use: 'url-loader?limit=25000'
                }
            ]
        }
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientEntry = isDevBuild ?
        [
            'babel-polyfill',
            // 'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './src/index.js'
        ] :
        ['babel-polyfill', './src/index.js'];

    
        const clientBundleConfig = merge(sharedConfig(), {
        entry: {
            'main-client': clientEntry
        },
        module: {
            rules: [
                {
                    test: /\.(sass|scss)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        isDevBuild ? 'css-loader' : 'css-loader?minimize',
                        isDevBuild ? 'sass-loader' : 'sass-loader?minimize'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        isDevBuild ? 'css-loader' : 'css-loader?minimize'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        isDevBuild ? 'css-loader' : 'css-loader?minimize',
                        isDevBuild ? 'less-loader' : 'less-loader?minimize',
                    ]
                },
            ]
        },
        output: { 
            path: path.join(__dirname, clientBundleOutputDir),
            filename: '[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin({filename:'site.css'}),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ]
    });

    if (isDevBuild){
        clientBundleConfig.devtool = 'source-map';
        clientBundleConfig.mode = 'development';
        clientBundleConfig.optimization = {
            minimize: false
        };
    }
    else{
        clientBundleConfig.mode = 'production';
        clientBundleConfig.devtool = 'source-map';
        clientBundleConfig.optimization = {
            minimize: true
        };
    }

    return clientBundleConfig;
};