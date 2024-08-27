import axiosInstance from "@/util/axios";
import axios from "axios";

export const verify = async (ref: string) => {
  try {
    const response = await axios.get(`https://natep.qwiva.io/api/mod-user/webhook/verify-scheduling-request?reference=${ref}`);
    return response.data.data;
  } catch (error) {
    console.log(error)
    // handleAnyError(error);
  }
};
// {
//   "id": "eb6575e6-e19c-428a-8242-82374d131556",
//   "nin": "9002277477",
//   "name": "Dnial OLUWALONI",
//   "email": "richy@yopmail.com",
//   "phone": "12131",
//   "otp_hash": null,
//   "passcode": null,
//   "has_scanned_passport": 0,
//   "state": "FCT",
//   "lga": null,
//   "address": "Natep Office",
//   "has_education": 0,
//   "has_employment": 0,
//   "has_police_report": 0,
//   "has_medicals": 0,
//   "user_code": "NP-936561805",
//   "status": "pickup",
//   "tracking_id": "OYKNRQD74PKYDTC",
//   "request_update": "dormant",
//   "photograph": null,
//   "agent_code": null,
//   "created_at": "2024-08-27T17:10:49.000Z",
//   "updated_at": "2024-08-27T17:10:49.000Z",
//   "country": "NGN",
//   "certificate_id": "c807556f-51f3-41a5-bd48-c935f550e018",
//   "delivery_type": "scheduled",
//   "delivery_time": "2024-08-28T08:00:00.000Z",
//   "user": "3151368d-482c-4e86-8f33-02c9b0047606",
//   "activity_type": "fresh registration"
// }