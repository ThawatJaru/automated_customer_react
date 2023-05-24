import { axiosInstance } from "../../config/axiosInstance";

export const getPayment = async (p_id) => {
  try {
    const res = await axiosInstance.get(`/api/payment_detail/${p_id}`,)
    return res
  } catch (error) {
    return null;
  }
}