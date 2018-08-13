import scriptjs from 'scriptjs';

const mercadopagoScriptUrl = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';

export async function loadSDK(callback) {
  scriptjs(mercadopagoScriptUrl, callback);
}

export function filterInstallmentLabels(labels) {
  return labels.filter(l => l.startsWith('CFT')).join(' ');
}

export async function getInstallments(paymentMethodId, issuerId, amount, callback) {
  window.Mercadopago.getInstallments(
    {
      issuer_id: issuerId,
      amount: amount,
      payment_method_id: paymentMethodId,
    },
    callback,
  );
}