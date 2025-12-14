import { MercadoPagoConfig } from 'mercadopago';

function getMercadoPagoAccessToken(): string {
  const token = process.env.MP_ACCESS_TOKEN;
  if (token && token.trim() !== '') return token;
  throw new Error('Missing MP_ACCESS_TOKEN');
}

export const mercadopago = new MercadoPagoConfig({
  accessToken: getMercadoPagoAccessToken(),
});


