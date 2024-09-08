import axiosInstance from "@/util/axios";
import { handleError } from "@/util/errorHandler";
import toast from "react-hot-toast";


  export const submitNin = async(data:any, setLoading: (value:boolean) => void) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('biodata/verify-nin', data)
      toast.success(response.data.message)
      return response.data.data
    } catch (error) {
      setLoading(false);
      handleError(error)
    } finally {
      setLoading(false)
    }
}

export const submitBiometrics = async(data:any,  setLoading: (value:boolean) => void) => {
  setLoading(true);
  const id = localStorage.getItem('id');

  try {
    const response = await axiosInstance.post(`biodata/face-recognition/${id}`, data)
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
  const id = localStorage.getItem('id');

  try {
    const response = await axiosInstance.post(`/biodata/scan-passport/${id}`, data)
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
  const id = localStorage.getItem('id');

  try {
    const response = await axiosInstance.post(`/biodata/update-photo/${id}`, data)
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
  const id = localStorage.getItem('id');
  try {
    const response = await axiosInstance.post(`/biodata/update-address/${id}`, data)
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
  const id = localStorage.getItem('id');
  try {
    const response = await axiosInstance.post(`/biodata/update-education/${id}`, data)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}

export const submitEmployment = async( data:any, setLoading: (value:boolean) => void ) => {
  setLoading(true);
  const id = localStorage.getItem('id');
  try {
    const response = await axiosInstance.post(`/biodata/update-employment/${id}`, data)
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
  const id = localStorage.getItem('id');
  try {
    const response = await axiosInstance.post(`/biodata/update-police-report/${id}`, data)
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
  const id = localStorage.getItem('id');
  try {
    const response = await axiosInstance.post(`/biodata/update-medical-report/${id}`, data)
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

// update 
export const updatePassport = async(data:any, setLoading: (value:boolean) => void) => {
  setLoading(true);
  const id = localStorage.getItem('idq');

  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/${id}`, data)
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
  const id = localStorage.getItem('idq');

  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/${id}`, data)
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
  const id = localStorage.getItem('idq');
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/${id}`, data)
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
  const id = localStorage.getItem('idq');
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/${id}`, data)
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
  const id = localStorage.getItem('idq');
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/${id}`, data)
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
  const id = localStorage.getItem('idq');
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/${id}`, data)
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
  const id = localStorage.getItem('idq');
  try {
    const response = await axiosInstance.patch(`/biodata/update-biodata/${id}`, data)
    toast.success(response.data.message)
    return response.data.data 
  } catch (error) {
    setLoading(false);
    handleError(error)
  } finally {
    setLoading(false);
  }
}