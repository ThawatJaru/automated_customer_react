import { axiosInstance } from "../../config/axiosInstance";

export const getAllPlantType = async (name, order) => {
  try {
    const res = await axiosInstance.get(`/api/plant_types?sortby=${name}&order=${order}`,)
    return res
  } catch (error) {
    return null;
  }
}
export const getPlantTypeFromCat = async (category_id) => {
  try {
    const res = await axiosInstance.get(`/api/plant_types?category_id=${category_id}`,)
    return res
  } catch (error) {
    return null;
  }
}
export const getPlantType = async (plant_type_id) => {
  try {
    const res = await axiosInstance.get(`/api/plant_types/${plant_type_id}`,)
    return res
  } catch (error) {
    return null;
  }
}
export const createPlantType = async (data) => {
  try {
    const res = await axiosInstance.post(`/api/plant_types`, data)
    return res
  } catch (error) {
    return null;
  }
}
export const createPlant = async (data, m_id) => {
  try {
    const res = await axiosInstance.post(`/api/plants?machine_id=${m_id}`, data)
    return res
  } catch (error) {
    return null;
  }
}
export const updatePlantType = async (plant_type_id, data) => {
  try {
    const res = await axiosInstance.put(`/api/plant_types/${plant_type_id}`, data)
    return res
  } catch (error) {
    return null;
  }
}
export const deletePlantType = async (plant_type_id) => {
  try {
    const res = await axiosInstance.delete(`/api/plant_types/${plant_type_id}`)
    return res
  } catch (error) {
    return null;
  }
}
