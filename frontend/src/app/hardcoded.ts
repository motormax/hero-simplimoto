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
