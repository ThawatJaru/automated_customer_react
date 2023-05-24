import { axiosInstance } from "../../config/axiosInstance";

export const loginService = async (data) => {

  try {
    const res = await axiosInstance.post(`/api/staffs`, data)
    return res
  } catch (error) {
    return null;
  }
}