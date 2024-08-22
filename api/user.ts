import axiosInstance from "@/util/axios";

export const verify = async (ref: any) => {
  try {
    const response = await axiosInstance.get(`webhook/verify-scheduling-request?reference=${ref}`);
    return response.data;
  } catch (error) {
    console.log(error)
    // handleAnyError(error);
  }
};
