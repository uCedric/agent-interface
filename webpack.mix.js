let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass("src/css/Hades.scss", "dist/css")
    .js("src/js/background.js", "dist/js")
    .js("src/js/router", "dist/js")
    .js("src/js/store", "dist/js")
    .js("src/js/HadesApp.js", "dist/js").vue()
    .copy("src/images", "dist/images")
    .copy("src/font-type", "dist/font-type")
    .options({
        processCssUrls: false
    });