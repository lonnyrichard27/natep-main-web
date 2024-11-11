import axios from 'axios';
import { getBenefactors } from './getBenefactors';
import { sha512 } from 'js-sha512';

interface RequestData {
  serviceTypeId: string;
  amount: string;
  orderId: number;
  payerName: string;
  payerEmail: string;
  description: string;
  lineItems: ReturnType<typeof getBenefactors>;
}

export const generateRemitaRRR = async (
  amount: number,
  description: string,
  payersName: string,
  updatedServiceTypeId: string
): Promise<string | Error> => {
  const email = 'natep@ng.gov';
  const d = new Date();

  // Setting API credentials based on environment
  const apiKey = process.env.REMITA_KEY;
  const merchantId =
    process.env.NODE_ENV === 'development' ||
    window.location.host.includes('netlify.app')
      ? '123456'
      : '123456788';
  const serviceTypeId =
    process.env.NODE_ENV === 'development' ||
    window.location.host.includes('netlify.app')
      ? '123444'
      : updatedServiceTypeId;

  const orderId = d.getTime();
  const payerName = `${payersName}`;
  const payerEmail = email;
  const amt = String(amount);
  const consumerToken = sha512(
    merchantId + serviceTypeId + orderId + amt + apiKey
  );

  // Setting URL based on environment
  const url =
    process.env.NODE_ENV === 'development' ||
    window.location.host.includes('netlify.app')
      ? 'https://remitademo.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit?callback=jsonp'
      : 'https://login.remita.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit?callback=jsonp';

  const requestData: RequestData = {
    serviceTypeId,
    amount: amt,
    orderId,
    payerName,
    payerEmail,
    description,
    lineItems: getBenefactors(amt),
  };

  const config = {
    headers: {
      dataType: 'json',
      'Content-Type': 'application/json',
      Authorization: `remitaConsumerKey=${merchantId},remitaConsumerToken=${consumerToken}`,
    },
  };

  try {
    const req = await axios.post(url, requestData, config);

    // Extracting RRR from the JSONP response
    const jsonpFunction = new Function('jsonp', `${req.data}`);
    let RRR: string | undefined;

    jsonpFunction((ref: { RRR: string }) => {
      RRR = ref.RRR;
    });

    if (RRR) {
      return RRR;
    } else {
      throw new Error('RRR not returned');
    }
  } catch (err) {
    return err instanceof Error ? err : new Error('An unknown error occurred');
  }
};
