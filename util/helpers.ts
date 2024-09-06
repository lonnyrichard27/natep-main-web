import { getCookie, setCookie } from 'cookies-next';
import moment from 'moment';

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
    path: '/'
  });
};


export const formatDateAndTime = (date: moment.MomentInput) => {
  const value = {
    Date: date ? moment(date).format('DD MMM, YYYY') : 'N/A',
    Time: date ? moment(date).format('h:mm A') : 'N/A'
  };
  return value;
};

export const moneyFormat = (amount: any) => {
  if (!amount) return 0;
  return new Intl.NumberFormat().format(amount);
};