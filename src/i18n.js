import i18next from 'i18next';

export default i18next.init({
  lng: 'en',
  debug: process.env.NODE_ENV !== 'test',
  resources: {
    en: {
      translations: {
        contenido: 'Hello, {{nombre}}',
      },
      funding: {
        title: 'Funding',
      },
    },
    es: {
      translations: {
        contenido: 'Hola, {{nombre}}',
      },
      funding: {
        title: 'Financiamiento',
      },
    },
  },
});
