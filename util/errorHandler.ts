import toast from 'react-hot-toast';

export const handleError = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    error?.statusMessage ||
    'An unexpected error occurred';

  toast.error(message);
  console.error('Error:', message);
};
