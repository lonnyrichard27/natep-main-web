import axiosInstance from "@/util/axios";
import { handleError } from "@/util/errorHandler";
import axios from "axios";
import toast from "react-hot-toast";

export const verify = async (ref: string) => {
  try {
    const response = await axios.get(`https://natep.qwiva.io/api/mod-user/webhook/verify-scheduling-request?reference=${ref}`);
    return response.data.data;
  } catch (error) {
    console.log(error)
    // handleAnyError(error);
  }
};


// export const fetchActivities = async(data:any, setLoading: (value:boolean) => void) => {
//   setLoading(true);
//   try {
//     const response = await axiosInstance.post('/activity/fetch-activities', data)
//     console.log(response.data.data,' activities')
//     return response.data.data
//   } catch (error) {
//     setLoading(false);
//     handleError(error)
//   } finally {
//     setLoading(false)
//   }
// }

export const fetchActivities = async() => {
  try {
    const response = await axiosInstance.get('/activity/fetch-activities')
    console.log(response.data.data,' activities')
    return response.data.data
  } catch (error) {
    handleError(error)
  }
}

export const getHistory = async ({
  page_num,
  search,
}: {
  page_num: number;
  search?: string;
}) => {
  try {
    const response = await axiosInstance.get(
      `/history/fetch-history?page_no=${page_num}${
        search ? `&search=${search}` : ''
      }`
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};
