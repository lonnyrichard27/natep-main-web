import { ApiResponse, PaginationData } from '@/types/ApiResponse';
import { CertificateType } from '@/types/CertificateType';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';

export const getCertificates = async () => {
  try {
    const response = await axiosInstance.get<ApiResponse<PaginationData>>(
      `/certificate/fetch-certificates`
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSingleCertificate = async ({
  id,
}: {
  id: string | string[];
}) => {
  try {
    const response = await axiosInstance.get<ApiResponse<CertificateType>>(
      `/certificate/view-certificate/${id}`
    );
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
