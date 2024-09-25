//Функции Gulp
const {src, dest, watch, parallel, series} = require('gulp');
//Функции Gulp

//Плагины
//SCSS
const scss = require('gulp-sass')(require('sass'));
//Префиксы для css
const autoprefixer = require('gulp-autoprefixer');
//Если нужен sourcemap и всё одним файлом
const concat = require('gulp-concat');
//Сжимаем js
const uglify = require('gulp-uglify-es').default;
//Обновление браузера
const browserSync = require('browser-sync').create();
//Очитска папок
const clean = require('gulp-clean');
//Переимновывание файлов
const rename = require('gulp-rename');
//Картинки avif
const avif = require('gulp-avif');
//Картинки webp
const webp = require('gulp-webp');
//Картинки imagemin
const imagemin = require('gulp-imagemin');
//Кеш
const newer = require('gulp-newer');
//ttf to woff
const ttf2woff = require('gulp-ttf2woff');
//ttf to woff
const ttf2woff2 = require('gulp-ttf2woff2');
//Вставка html в html
const include = require('gulp-file-include');
//Svg спрайты
const svgSprite = require('gulp-svg-sprite'), cheerio = require('gulp-cheerio');
//Babel 
const babel = require('gulp-babel');
//Zip
const zip = require('gulp-zip');
//Работа с файлами
const fs = require('fs');
//FTP
const ftp = require('vinyl-ftp');
//Плагины
//Ссылки
const links = {
    imagesSrc: 'src/assets/images/src',
    imagesDist: 'src/assets/images',
    fontsSrc: 'src/assets/fonts/src',
    fontsDist: 'src/assets/fonts',
    jsSrc: 'src/assets/js_input',
    jsDist: 'src/assets/js',
    scssSrc: 'src/assets/scss',
    cssDist: 'src/assets/css',
    htmlSrc: 'src/assets/html_parts/pages',
    htmlDist: 'src',
    swiperJs: 'node_modules/swiper/swiper-bundle.min.js',
    swiperCss: 'node_modules/swiper/swiper-bundle.min.css',
    choicesJs: 'node_modules/choices.js/public/assets/scripts/choices.min.js',
    choicesCss: 'node_modules/choices.js/public/assets/styles/choices.min.css',
    tippyJs: 'node_modules/tippy.js/dist/tippy-bundle.umd.min.js',
    tippyCss: 'node_modules/tippy.js/dist/tippy.css',
    popperJs: 'node_modules/@popperjs/core/dist/umd/popper.min.js',
    svgSprites: 'src/assets/images/sprites/*.svg'
}
//Переменные
//SFTP
function upload() {
    return src(`${links.cssDist}/*`)
        .pipe(ftp({
            host: 'csgomine.ru',
            user: 'cb05967_admin',
            pass: '34Agnf321MFDSa',
            port: 21,
            remotePath: "/csgomine.ru/public_html/wp-content/themes/CustomTheme/assets/css/",
        }));
}
//SFTP
//Смотрящий
function watching() {
    watch([links.imagesSrc], images)
    watch([links.fontsSrc], fonts)
    watch([links.jsSrc], scripts)
    watch([links.scssSrc], styles)
    watch([`${links.htmlDist}/assets/html_parts/**/*.html`], html)
    watch([links.svgSprites], series(sprites, html))
}
//Смотрящий

//Изображения
function images() {
    return src([`${ links.imagesSrc }/*.{png,jpg,jpeg}`])
        .pipe(newer(links.imagesDist))
        .pipe(avif({quality: 100}))
        .pipe(newer(links.imagesDist))
        .pipe(src([`${ links.imagesSrc }/*.{png,jpg,jpeg}`]))
        .pipe(webp())
        .pipe(newer(links.imagesDist))
        .pipe(src([`${ links.imagesSrc }/*.*`]))
        .pipe(imagemin())
        .pipe(dest(links.imagesDist))
        .pipe(browserSync.stream())
}
//Изображения

//Шрифты
function fonts(){
    return src([`${links.fontsSrc}/*.ttf`])
        .pipe(newer(links.fontsDist))
        .pipe(ttf2woff())
        .pipe(newer(links.fontsDist))
        .pipe(src([`${links.fontsSrc}/*.ttf`]))
        .pipe(ttf2woff2())
        .pipe(newer(links.fontsDist))
        .pipe(src([`${links.fontsSrc}/*.ttf`]))
        .pipe(dest(links.fontsDist))
        .pipe(browserSync.stream())
}
//Шрифты

//Скрипы js
function scripts() {
    return src([`${links.jsSrc}/*.js`])
        .pipe(concat('scripts.js'))
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify({compress: true}))
        .pipe(dest(links.jsDist))
        .pipe(src([`${links.jsSrc}/plugins/*.js`]))
        .pipe(dest(links.jsDist))
        .pipe(browserSync.stream())
}
//Скрипы js

//Стили css
function styles() {
    return src([`${links.scssSrc}/fonts.scss`, `${links.scssSrc}/plugins/*.css`, `${links.scssSrc}/*.scss`])
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(dest(links.cssDist))
        .pipe(browserSync.stream())
}
//Стили css

//Svg спрайты
function sprites() {
    return src(links.svgSprites)
        .pipe(svgSprite({
                mode: {
                  symbol: {
                    dest: '.',
                    sprite: 'sprite.svg',
                  },
                },               
            }
        ))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('svg').addClass('sprites');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(dest(links.htmlDist))
}
//Svg спрайты

//include для html
function html() {
    return src([`${links.htmlSrc}/*.html`])
        .pipe(include())
        .pipe(dest(links.htmlDist))
        .pipe(browserSync.stream())
}
//include для html

//Обновление окна браузера
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'src/',
            notify: false, // Отключаем уведомления
        }
    });
}
//Обновление окна браузера

//Очистка проекта
function cleanDist() {
    return src('dist')
        .pipe(clean())
}
//Очистка проекта
//Добавление swiper slider
function swiperJs() {
    return src(links.swiperJs)
        .pipe(dest(links.jsDist))
}
function swiperCss() {
    return src(links.swiperCss)
        .pipe(dest(links.cssDist))
}
//Добавление swiper slider

//Добавление choices
function choicesJs() {
    return src(links.choicesJs)
        .pipe(dest(links.jsDist))
}
function choicesCss() {
    return src(links.choicesCss)
        .pipe(dest(links.cssDist))
}
//Добавление choices

//Добавление tippy
function tippyJs() {
    return src(links.tippyJs)
        .pipe(src(links.popperJs))
        .pipe(dest(links.jsDist))
}
function tippyCss() {
    return src(links.tippyCss)
        .pipe(rename({suffix: ".min"}))
        .pipe(dest(links.cssDist))
}
//Добавление tippy

//Билд проекта
function building() {
    return src([
        `${links.cssDist}/*.css`,
        `${links.jsDist}/*.js`,
        `${links.htmlDist}/*.*`,
        `!${links.htmlDist}/sprite.svg`,
        `${links.imagesDist}/*.*`,
        `${links.fontsDist}/*.*`,
    ], {base: 'src'})
        .pipe(zip('dist.zip'))
        .pipe(dest('dist'))
}
//Билд проекта

exports.watching = watching;
exports.images = images;
exports.fonts = fonts;
exports.scripts = scripts;
exports.styles = styles;
exports.html = html;
exports.browsersync = browsersync;
exports.sprites = sprites;
exports.upload = upload;

exports.tippy = parallel(tippyJs, tippyCss);
exports.choices = parallel(choicesJs, choicesCss);
exports.swiper = parallel(swiperJs, swiperCss);
exports.build = series(cleanDist, building);
exports.default = parallel(browsersync, watching);