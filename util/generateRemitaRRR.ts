import axios from 'axios';
import { getBenefactors } from './getBenefactors';
import { codeGenerator } from './helpers';
import crypto from 'crypto';

export type RemitaSuccessResponse = {
  statuscode?: string;
  RRR?: string;
  status?: string;
  txref: string;
};

export type RemitaErrorResponse = {
  statusMessage?: string;
};

// Type guard to check if the response is a success response
export const isRemitaSuccessResponse = (
  response: RemitaSuccessResponse | RemitaErrorResponse
): response is RemitaSuccessResponse => {
  return (response as RemitaSuccessResponse).txref !== undefined;
};

export const generateRemitaRRR = async ({
  amount,
  payerName,
  payerEmail,
  payerPhone,
  description,
}: {
  amount: number;
  payerName: string;
  payerEmail: string;
  payerPhone: string;
  description: string;
}): Promise<RemitaSuccessResponse | RemitaErrorResponse> => {
  const orderId = codeGenerator(16, 'abcdefghijklmnopqrstuvwxyz1234567890');
  const body = {
    serviceTypeId: process.env.REMITA_SERVICE_ID,
    amount: amount,
    orderId: orderId,
    payerName: payerName,
    payerEmail: payerEmail,
    payerPhone: payerPhone,
    description: description,
    // lineItems: getBenefactors(amount),
  };

  const data = `${process.env.MERCHANT_ID}${process.env.REMITA_SERVICE_ID}${orderId}${amount}${process.env.REMITA_APIKEY}`;

  const api_hash = crypto.createHash('sha512').update(data).digest('hex');

  const config = {
    headers: {
      Authorization: `remitaConsumerKey=${process.env.MERCHANT_ID},remitaConsumerToken=${api_hash}`,
    },
  };

  const url = `${process.env.REMITA_URL}`;

  const response = await axios.post(url, body, config);

  if (typeof response.data === 'string') {
    const json_string = response.data.replace(/jsonp \((.*)\)/, '$1');
    const parsed: RemitaSuccessResponse = JSON.parse(json_string);
    return { ...parsed, txref: orderId };
  } else {
    const error: RemitaErrorResponse = response.data;
    return error;
  }
};
