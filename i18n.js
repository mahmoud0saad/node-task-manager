const i18next = require('i18next');
const BackendImport = require('i18next-fs-backend');
const Backend = BackendImport.default || BackendImport;
const middleware = require('i18next-http-middleware');
const { I18N } = require('./config');

i18next// @ts-ignore
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: { loadPath: I18N.loadPath },
    fallbackLng: I18N.fallbackLng,
    preload: I18N.preload
  });

module.exports = { i18next, middleware };
