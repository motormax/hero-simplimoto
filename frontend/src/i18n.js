import i18next from 'i18next';

export default i18next.init({
  lng: 'es',
  debug: process.env.NODE_ENV !== 'test',
  resources: {
    es: {
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
      footer: {
        company_name: 'Hero Motors Argentina S.A',
        company_adress: 'Av. del Libertados 1150, Vicente Lopez. Buenos Aires, Argentina',
        showroom: 'Showroom',
        showroom_phone_number: '011 4796-5514 / 2729',
        email: 'Email',
        email_adress: 'showroom@heromotos.com.ar',

        know_our_bikes: 'Conocé nuestras motos',
        hunk_sport: 'Hunk Sport',
        hunk: 'Hunk',
        dash: 'Dash',
        ignitor: 'Ignitor',
        support: 'Soporte',
        family: 'Familia Hero',
        advice: 'Consejos',
        maintenance: 'Plan de Servicio y Mantenimiento',
        i3s: 'Descubrí el sistema I3s',
      },
    },
  },
});
