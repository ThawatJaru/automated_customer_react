import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";

export const getAllPlants = async (data) => {
  try {
    const res = await axiosInstance.get(`/api/plants?machine_id=${data.m_id}&category_id=${data.cat_id}&sortby=${data.sortBy}&order=${data.sort}&search=${data.search}`,)
    return res
  } catch (error) {
    return null;
  }
}
export const getPlants = async (m_id, p_id) => {
  try {
    const res = await axiosInstance.get(`/api/plants/${p_id}?machine_id=${m_id}`,)
    return res
  } catch (error) {
    return null;
  }
}

export const updatePlants = async (m_id, p_id, data) => {
  try {
    const res = await axiosInstance.put(`/api/plants/${p_id}?machine_id=${m_id}`, data)
    return res
  } catch (error) {
    return null;
  }
}
export const deletePlants = async (m_id, p_id) => {
  try {
    const res = await axiosInstance.delete(`/api/plants/${p_id}?machine_id=${m_id}`)
    return res
  } catch (error) {
    return null;
  }
}
export const changePlantState = async (p_id, data) => {
  try {
    const res = await axiosInstance.patch(`/api/request_change_plant_state/${p_id}`, data)
    return res
  } catch (error) {
    return null;
  }
}
export const plantOpenDoor = async (p_id) => {
  try {
    const res = await axiosInstance.patch(`/api/signal/request_open/${p_id}`)
    return res
  } catch (error) {
    return null;
  }
}
export const plantCloseDoor = async (p_id) => {
  try {
    const res = await axiosInstance.patch(`/api/signal/request_close/${p_id}`)
    return res
  } catch (error) {
    return null;
  }
}
export const webhookToggleDoor = async (p_id, data) => {
  try {
    const res = await axios.post(`/webhook/door_status/${p_id}`)
    return res
  } catch (error) {
    return null;
  }
}