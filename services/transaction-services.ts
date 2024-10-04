import { ApiResponse } from '@/types/ApiResponse';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';

export const validateTransaction = async ({
  rrr,
  txref,
}: {
  rrr: string | null;
  txref: string | null;
}) => {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      `/remita/remita-payment-verification?rrr=${rrr}&txref=${txref}`
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};
