import i18next from 'i18next';

export default i18next.init({
  lng: 'es',
  debug: process.env.NODE_ENV !== 'test',
  resources: {
    es: {
      index: {
        buy_the_bike: 'Comprá tu próxima moto',
        online: '100% online',
        bikes_models_title: 'Conocé nuestras motos',
      },
      dateyourbike: {
        title: 'Conocé tu futura moto',
        schedule: 'Arreglá una cita',
        change: 'Cambiar',
      },
      motorcycleCard: {
        gloves: 'Guantes',
        helmet: 'Casco',
        trunks: 'Baúl',
        buy: 'Comprar',
        ask: 'Preguntar',
        live_tour: 'Tour en vivo',
        appointment: 'Arreglá una cita',
        currency_sign: '$',
        month: 'mes',
      },
      footer: {
        company_name: 'DISTRIBUIDORA ARGENTINA DE MOTOS S.A.',
        company_address: 'Esmeralda 1320 5° "A" Ciudad Autónoma de Buenos Aires',
        showroom: 'Teléfono',
        whatsapp: 'Whatsapp',
        showroom_phone_number: '011 5368-6267',
        whatsapp_phone_number: '011 6734-1607',
        email: 'Email',
        email_adress: 'info@heromotodigital.com',

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
        you_are_buying: 'Estás comprando una ...',
        follow_us: 'Seguinos',
        privacy_policy: 'Política de Privacidad',
        disclaimer: 'Descargo de Responsabilidad',
        cancel_order: 'Cancelar compra',
      },
      dashboard: {
        dashboard: 'Dashboard',
        good_choice: '¡Buena elección!',
        header_intro: 'Estás a pocos pasos de tener la moto en tus manos',
      },
      bikeModelSection: {
        currency_sign: '$',
        change_model: 'Cambiar modelo',
        live_tour: 'Tour en vivo',
        moto_specs: 'Ficha técnica',
      },
      financing: {
        financing: '¿Cómo te la financiamos?',
      },
      accessories_section: {
        accessories: '¿Qué accesorios te interesan?',
        currency_sign: '$',
        gloves: 'Guantes',
        helmet: 'Casco',
        trunk: 'Baúl',
      },
      plateRegistration: {
        currency_sign: '$',
        plate_registration: '¿Cómo querés patentarla?',
      },
    },
    en: {
      dashboard: {
        dashboard: 'Dashboard',
      },
      dateyourbike: {
        title: 'Date your bike',
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
