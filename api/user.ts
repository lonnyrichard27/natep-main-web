import axiosInstance from "@/util/axios";

export const verify = async (ref: string) => {
  try {
    const response = await axiosInstance.get(`webhook/verify-scheduling-request?reference=${ref}`);
    return response;
  } catch (error) {
    console.log(error)
    // handleAnyError(error);
  }
};
