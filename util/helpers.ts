import { getCookie, setCookie } from 'cookies-next';
import moment from 'moment';
import toast from 'react-hot-toast';

import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

// Register the language locale (English in this case)
countries.registerLocale(enLocale);

export const getAuthCookies = () => {
  const cookie: any = getCookie('natep_user', {
    path: '/',
  });

  const authCookie = cookie && JSON?.parse(cookie);

  const token = authCookie?.token;
  const isAuthenticated = authCookie?.isAuthenticated;

  return { token, isAuthenticated };
};

export const loginUser = (data: any) => {
  setCookie('natep_user', JSON.stringify(data), {
    path: '/',
  });
};

export const textReplacer = (value: string, replace_item: string) => {
  return value.replaceAll(replace_item, ' ');
};

export const formatDateAndTime = (date: moment.MomentInput) => {
  const value = {
    Date: date ? moment(date).format('DD MMM, YYYY') : 'N/A',
    Time: date ? moment(date).format('h:mm A') : 'N/A',
  };
  return value;
};

export const moneyFormat = (amount: any) => {
  if (!amount) return 0;
  return new Intl.NumberFormat().format(amount);
};

export const getDate = (date: moment.MomentInput) => {
  const value = date
    ? moment(date).format('DD MMM, YYYY').toUpperCase()
    : 'N/A';
  return value;
};

export const combineDateAndTime = (selectedDate: string, time: string) => {
  // Step 1: Parse the selectedDate into a Date object
  const date = new Date(selectedDate);

  // Step 2: Extract hours and minutes from the time string (formatted as HH:MM)
  const [hours, minutes] = time.split(':').map(Number);

  // Step 3: Set the hours and minutes on the date object
  date.setHours(hours);
  date.setMinutes(minutes);

  // Step 4: Return the combined date in local time without UTC conversion
  // You can format the date to your needs. Here’s an example of local ISO format:
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return offsetDate.toISOString().slice(0, 19); // returns YYYY-MM-DDTHH:mm:ss
};

export const getDocument = (id: string | undefined | string[]) => {
  if (!id) {
    return;
  }

  const file = `${process.env.NEXT_PUBLIC_BASE_URL}/certificate/download-certificate/${id}`;

  return file;
};

export const downloadCertificate = (url: string | undefined) => {
  if (!url) {
    return toast.error('Invalid download URL');
  }

  window.open(url);
};

export const getISOCode = (name: string) => {
  // Try to get the ISO code for a country
  let isoCode = countries.getAlpha2Code(name, 'en');

  if (!isoCode) {
    console.log(`ISO code not found for: ${name}`);
  }

  return isoCode;
};

export const getCountryName = (isoCode: string) => {
  // Try to get the country name from the ISO code
  const countryName = countries.getName(isoCode, 'en') || isoCode;

  if (!countryName) {
    console.log(`Country name not found for ISO code: ${isoCode}`);
  }

  return countryName;
};

export const downloadSheet = (fileCode: string | undefined) => {
  return window.open(
    `${process.env.NEXT_PUBLIC_BASE_URL}/download/xcel/${fileCode}`
  );
};

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Error copying text: ', err);
  }
};

export const codeGenerator = (length: number, alpha?: string) => {
  const numeric = '1234567890';
  let result = '';

  if (alpha) {
    for (let i = 0; i < length; i++) {
      result += alpha.charAt(Math.floor(Math.random() * alpha.length));
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += numeric.charAt(Math.floor(Math.random() * numeric.length));
    }
  }

  return result;
};

  // const formatDate = (date: Date | undefined): string | undefined => {
  //   if (!date) return undefined;

  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');

  //   return `${year}-${month}-${day}`;
  // };

  export const formatDate = (date: Date | undefined): string | undefined => {
    if (!date) return undefined;
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}T`;
  };
  