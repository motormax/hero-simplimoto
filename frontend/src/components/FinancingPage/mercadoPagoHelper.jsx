import scriptjs from 'scriptjs';

const mercadopagoScriptUrl = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';

async function loadSDK(callback) {
  scriptjs(mercadopagoScriptUrl, callback);
}

export default loadSDK;
