import { axiosInstance } from "../../config/axiosInstance";

export const loginService = async (data) => {

  try {
    const res = await axiosInstance.post(`/api/staffs`, data)
    if(res){
      const user_plant = {
        username:data.username,
        id:res.data.id
      }
      localStorage.setItem('user_plant', JSON.stringify(user_plant));
    }
    return res
  } catch (error) {
    return null;
  }
}