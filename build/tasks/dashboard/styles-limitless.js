const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const sourceMaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const postCss = require('gulp-postcss');
const postCssCopy = require('postcss-copy');
const imageMin = require('imagemin');
const imageMinJpegtran = require('imagemin-jpegtran');
const imageMinPngquant = require('imagemin-pngquant');
const imageMinGifsicle = require('imagemin-gifsicle');
const imageMinSvgo = require('imagemin-svgo');
const config = require('../../config');

module.exports = function () {
    return gulp
        .src(path.resolve(config.dashboardAssetsPath, 'less/limitless.less'))
        .pipe(sourceMaps.init())
        .pipe(less())
        .on('error', function (error) {
            notify({
                title: 'Build Error',
                message: 'Dashboard: Limitless Styles failed',
            }).write(error);

            gutil.log(gutil.colors.red(error.toString()));

            this.emit('end');
        })
        .pipe(postCss([
            postCssCopy({
                basePath: '../dashboard/assets',
                dest: '../public/assets/',
                template: '[name].[hash].[ext]',
                transform(fileMeta) {
                    if (['jpg', 'png', 'gif', 'svg'].indexOf(fileMeta.ext) === -1) {
                        return fileMeta;
                    }

                    return imageMin.buffer(fileMeta.contents, {
                        plugins: [
                            imageMinPngquant(),
                            imageMinJpegtran({
                                progressive: true,
                            }),
                            imageMinSvgo(),
                            imageMinGifsicle(),
                        ]
                    }).then(result => {
                        fileMeta.contents = result;
                        return fileMeta;
                    });
                }
            }),
        ]/*, { // This fixes sourcemaps stop working
            to: '../public/css/limitless.css',
        }*/))
        .pipe(cleanCss())
        .pipe(rename({ basename: 'limitless' }))
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest(config.cssPath));
};
