import axios from 'axios';
import { getBenefactors } from './getBenefactors';
import { codeGenerator } from './helpers';
import crypto from 'crypto';

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
}) => {
  const orderId = codeGenerator(16, 'abcdefghijklmnopqrstuvwxyz1234567890');
  const body = {
    serviceTypeId: process.env.REMITA_SERVICE_ID,
    amount: amount,
    orderId: orderId,
    payerName: payerName,
    payerEmail: payerEmail,
    payerPhone: payerPhone,
    description: description,
    lineItems: getBenefactors(amount),
  };

  const data = `${process.env.MERCHANT_ID}${process.env.REMITA_SERVICE_ID}${orderId}${amount}${process.env.REMITA_APIKEY}`;

  const api_hash = crypto.createHash('sha512').update(data).digest('hex');

  const config = {
    headers: {
      Authorization: `remitaConsumerKey=${process.env.MERCHANT_ID},remitaConsumerToken=${api_hash}`,
    },
  };

  const url = `${process.env.REMITA_URL}/echannelsvc/merchant/api/paymentinit`;

  const response = await axios.post(url, body, config);

  // Step 1: Extract the JSON part from the string (remove 'jsonp (' and the closing ')')
  const json_string = response.data.replace(/jsonp \((.*)\)/, '$1');

  // Step 2: Parse the JSON string into an object
  const parsed: { statuscode: string; RRR: string; status: string } =
    JSON.parse(json_string);

  console.log(parsed);

  return { ...parsed, txref: orderId };
};
