/* eslint-env browser */
import scriptjs from 'scriptjs';

const mercadopagoScriptUrl = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';

function loadSDKCallback(callback) {
  window.Mercadopago.setPublishableKey(process.env.REACT_APP_MERCADO_LIBRE_KEY);
  callback();
}

export async function loadSDK(callback) {
  scriptjs(mercadopagoScriptUrl, () => {
    loadSDKCallback(callback);
  });
}

export function filterInstallmentLabels(labels) {
  return labels.filter(l => l.startsWith('CFT')).join(' ');
}

export async function getPaymentMethod(creditCardNumber, callback) {
  const bin = creditCardNumber.replace(/[ _.-]/g, '').slice(0, 6);
  if (bin.length >= 6) {
    window.Mercadopago.getPaymentMethod({
      bin,
    }, callback);
  }
}

export function getInstallments(paymentMethodId, issuerId, amount, callback) {

  if (window.Mercadopago) {
    window.Mercadopago.getInstallments(
      {
        issuer_id: issuerId,
        amount,
        payment_method_id: paymentMethodId,
      },
      callback,
    );
  }
}
