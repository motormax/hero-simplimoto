export const URLS = {
  'HUNK SPORTS': 'assets/img/Hunk-Sports-Argentina-.png',
  HUNK: 'assets/img/Hunk-Clasica-150-Argentina.png',
  IGNITOR: 'assets/img/hero-ignitor-125.png',
  DASH: 'assets/img/hero-dash-110-.png'
};

export const IDS = {
  'HUNK SPORTS': 3,
  HUNK: 1,
  IGNITOR: 2,
  DASH: 4
};

export const NAMES = Object.keys(IDS).map(name => ({ [IDS[name]]: name })).reduce((a, e) => ({ ...a, ...e }), {});

/* For humans:
  HUNK 150: 9610002
  IGNITOR 125: 9610003
  HUNK 150 SPORTS: 9610001
  DASH 110: 9610004
*/
export const INFOMOTO = {
  1: 9610002,
  2: 9610003,
  3: 9610001,
  4: 9610004
};

export const ISSUER_URLS = {
  mapfre: 'https://www.123seguro.com/images/front/table/mapfre.png',
  libra: 'https://4.bp.blogspot.com/-EbhruQjEDLo/WnRQeldOIaI/AAAAAAAABiE/zDmWBehmIOY7NzyL_kd25IgUHdYTqYSbQCLcBGAs/s400/libra.png',
  atm: 'https://www.atmseguros.com.ar/newsitedev/wp-content/uploads/2018/06/logo-atm-.png',
  orbis: 'https://www.123seguro.com/images/front/cotizar-auto/aseguradoras/orbis-seguros-de-autos.svg',
};
