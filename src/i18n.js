import i18next from 'i18next';

export default i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translations: {
        contenido: 'Hello, {{nombre}}',
      },
    },
    es: {
      translations: {
        contenido: 'Hola, {{nombre}}',
      },
    },
  },
});
