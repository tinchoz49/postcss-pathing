const path = require('path');
const gutil = require('gulp-util');

module.exports = {
    rootPath: path.resolve(__dirname, '../'),
    dashboardPath: path.resolve(__dirname, '../'),
    modulesPath: path.resolve(__dirname, '../modules'),

    dashboardAssetsPath: path.resolve(__dirname, '../dashboard/assets'),
    appAssetsPath: path.resolve(__dirname, '../resources/assets'),

    nodePath: path.resolve(__dirname, '../node_modules'),

    publicPath: path.resolve(__dirname, '../public'),
    cssPath: path.resolve(__dirname, '../public/css'),
    jsPath: path.resolve(__dirname, '../public/js'),
    langPath: path.resolve(__dirname, '../public/lang'),
};
