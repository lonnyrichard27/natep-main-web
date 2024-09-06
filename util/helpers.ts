import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

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

export const logoutUser = () => {
  const { push } = useRouter();

  deleteCookie('natep_user', { path: '/' });
  push('/');
};

export const textReplacer = (value: string, replace_item: string) => {
  return value.replaceAll(replace_item, ' ');
};
