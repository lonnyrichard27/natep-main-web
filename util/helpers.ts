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
