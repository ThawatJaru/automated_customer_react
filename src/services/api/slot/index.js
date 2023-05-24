
import { axiosInstance } from "../../config/axiosInstance";

export const getAllSlot = async (m_id) => {
  try {
    const res = await axiosInstance.get(`/api/slots?machine_id=${m_id}`,)
    return res
  } catch (error) {
    return null;
  }
}