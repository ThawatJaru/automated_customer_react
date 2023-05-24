import { axiosInstance } from "../../config/axiosInstance";

export const getAllMachine = async (staff_id) => {
  try {
    const res = await axiosInstance.get(`/api/machines?staff_id=${staff_id}`,)
    return res
  } catch (error) {
    return null;
  }
}
export const getMachine = async (staff_id, m_id) => {
  try {
    const res = await axiosInstance.get(`/api/machines/${m_id}?staff_id=${staff_id}`,)
    return res
  } catch (error) {
    return null;
  }
}
export const searchMachine = async (staff_id, textSearch) => {
  try {
    const res = await axiosInstance.get(`/api/machines?staff_id=${staff_id}&search=${textSearch}`,)
    return res
  } catch (error) {
    return null;
  }
}
export const createMachine = async (staff_id, data) => {
  try {
    const res = await axiosInstance.post(`/api/machines?staff_id=${staff_id}`, data)
    return res
  } catch (error) {
    return null;
  }
}
export const updateMachine = async (staff_id, m_id, data) => {
  try {
    const res = await axiosInstance.put(`/api/machines/${m_id}?staff_id=${staff_id}`, data)
    return res
  } catch (error) {
    return null;
  }
}
export const deleteMachine = async (staff_id, machine_id) => {
  try {
    const res = await axiosInstance.delete(`/api/machines/${machine_id}?staff_id=${staff_id}`)
    return res
  } catch (error) {
    return null;
  }
}