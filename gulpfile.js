const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
// const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
  imagenes: './src/img/**/*',
  scss: './src/scss/**/*.scss',
  js: './src/js/**/*.js',
};

function compilarSASS() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./build/css'));
}

function minificarCss() {
  return src(paths.scss)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('./build/css'));
}

function javascript() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./build/js'));
}

function imagenes() {
  return src(paths.imagenes).pipe(imagemin()).pipe(dest('./build/img'));
  // .pipe(notify({ message: 'Imagen Minificada' }));
  // Necesita tener instalado gulp-notify
}

function watchArchivos() {
  watch(paths.scss, compilarSASS);
  watch(paths.js, javascript);
}

function versionWebp() {
  return src(paths.imagenes).pipe(webp()).pipe(dest('./build/img'));
}

exports.compilarSASS = compilarSASS;
exports.js = javascript;
exports.minificar = minificarCss;
exports.watch = watchArchivos;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;

// exports.default = series(compilarSASS, imagenes, watchArchivos);
exports.default = series(compilarSASS, javascript);
