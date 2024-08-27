import axiosInstance from "@/util/axios";
import axios from "axios";

export const verify = async (ref: string) => {
  try {
    const response = await axios.get(`https://natep.qwiva.io/api/mod-user/webhook/verify-scheduling-request?reference=${ref}`);
    return response;
  } catch (error) {
    console.log(error)
    // handleAnyError(error);
  }
};
