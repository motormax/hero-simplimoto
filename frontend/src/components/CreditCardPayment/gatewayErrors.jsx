const gatewayErrorCodes = [
  { code: '205', field: 'cardNumber', message: 'Ingresa el número de tu tarjeta.' },
  { code: '208', field: 'cardExpirationMonth', message: 'Elige un mes.' },
  { code: '209', field: 'cardExpirationYear', message: 'Elige un año.' },
  { code: '212', field: 'docType', message: 'Ingresa tu documento.' },
  { code: '213', field: 'docType', message: 'Ingresa tu tipo de documento.' },
  { code: '214', field: 'docNumber', message: 'Ingresa tu tipo de documento.' },
  { code: '220', field: 'issuerId', message: 'Ingresa tu banco emisor.' },
  { code: '221', field: 'cardholderName', message: 'Ingresa el nombre y apellido.' },
  { code: '224', field: 'securityCode', message: 'Ingresa el código de seguridad.' },
  { code: 'E301', field: 'cardNumber', message: 'El número de tarjeta no es válido. Por favor vuelve a ingresarlo.' },
  { code: 'E302', field: 'securityCode', message: 'El código de seguridad no es válido. Por favor vuelve a ingresarlo.' },
  { code: '316', field: 'cardholderName', message: 'Ingresa un nombre válido.' },
  { code: '322', field: 'docType', message: 'Revisa tu documento.' },
  { code: '323', field: 'docType', message: 'Revisa tu documento.' },
  { code: '324', field: 'docNumber', message: 'Revisa tu documento.' },
  { code: '325', field: 'cardExpirationMonth', message: 'Revisa la fecha.' },
  { code: '326', field: 'cardExpirationYear', message: 'Revisa la fecha.' },
];

export default gatewayErrorCodes;

