import axios from "axios";

export const webhookPaymentStatus = async (pay_id,data) => {
  try {
    const res = await axios.post(`/webhook/payment_status/${pay_id}`, data)
    return res
  } catch (error) {
    return null;
  }
}