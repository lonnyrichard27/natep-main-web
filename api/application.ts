import axiosInstance from "@/util/axios";
import { handleError } from "@/util/errorHandler";
import toast from "react-hot-toast";


export const submitBiometrics = async(data:any,  setLoading: (value:boolean) => void) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(`biodata/face-recognition/`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}


export const submitPassport = async(data:any, setLoading: (value:boolean) => void) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(`/biodata/scan-passport`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const submitPhotograph = async(data:any, setLoading: (value:boolean) => void) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(`/biodata/update-photo/`, data)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}


export const submitAddress = async( data:any, setLoading: (value:boolean) => void ) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(`/biodata/update-address/`, data)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const submitEducation = async( data:any, setLoading: (value:boolean) => void ) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(`/biodata/update-education/`, data)
    return response.data.data;
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const submitEmployment = async( data:any, setLoading: (value:boolean) => void ) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(`/biodata/update-employment/`, data)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}


export const submitPoliceReport = async(data:any, setLoading: (value:boolean) => void) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(`/biodata/update-police-report/`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const submitMedicalReport = async(data:any, setLoading: (value:boolean) => void) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(`/biodata/update-medical-report/`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const getCountries = async () => {
  try {
    const response = await axiosInstance.get('/locator/fetch-country-data')
    return response?.data?.data;
  } catch (error) {
    handleError(error)
  }
}

export const getState = async (countryCode:any) => {
  try {
    const response = await axiosInstance.get(`/locator/fetch-country-data?country_code=${countryCode}`);
    return response?.data?.data;
  } catch (error) {
    handleError(error)
    
  }
}

// update application
export const updatePassport = async(data:any, setLoading: (value:boolean) => void) => {
  setLoading(true);
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const updatePhotograph = async(data:any, setLoading: (value:boolean) => void) => {
  setLoading(true);
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}


export const updateAddress = async( data:any, setLoading: (value:boolean) => void ) => {
  setLoading(true);
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const updateEducation = async( data:any, setLoading: (value:boolean) => void ) => {
  setLoading(true);
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/`, data)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const updateEmployment = async( data:any, setLoading: (value:boolean) => void ) => {
  setLoading(true);
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/`, data)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}


export const updatePoliceReport = async(data:any, setLoading: (value:boolean) => void) => {
  setLoading(true);
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const updateMedicalReport = async(data:any, setLoading: (value:boolean) => void) => {
  setLoading(true);
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}
