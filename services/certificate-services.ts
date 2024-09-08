import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';

export const getCertificates = async () => {
  try {
    const response = await axiosInstance.get(`/certificate/fetch-certificates`);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getOngoingDeliveries = async () => {
  try {
    const response = await axiosInstance.get(
      `/delivery/fetch-delivery-requests`
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};
