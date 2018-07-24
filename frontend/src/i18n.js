import i18next from 'i18next';

export default i18next.init({
  lng: 'es',
  debug: process.env.NODE_ENV !== 'test',
  resources: {
    es: {
      index: {
        buy_the_bike: 'Comprá tu próxima moto',
        online:'100% online',
      },
      motorcycleCard: {
        gloves: 'Guantes',
        helmet: 'Casco',
        trunks: 'Baúl',
        buy: 'Comprar',
        live_tour: 'Tour en vivo',
        appointment: 'Arreglá una cita',
        currency_sign: 'AR$',
        month: 'mes',
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
