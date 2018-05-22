import i18next from 'i18next';

export default i18next.init({
  lng: 'en',
  debug: process.env.NODE_ENV !== 'test',
  resources: {
    en: {
      index: {
        simplimoto: 'Simplimoto',
      },
      dashboard: {
        dashboard: 'Dashboard',
      },
      checkout: {
        title: 'Checkout Summary',
        bike_model: 'Bike model',
        accessories: 'Accessories',
        delivery: 'Delivery',
        insurance_options: 'Insurance Options',
        total: 'Total',
        buy_bike: 'Buy bike!',
      },
      financing: {
        title: 'Financing',
        change: 'Change',
      },
    },
  },
});
