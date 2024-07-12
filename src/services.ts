import { API_ENDPOINT } from "./utils/constants";
// import globalAxiosApi from "./utils/axios";
import axios from "axios";

export const signUp = async (
  fullName: string,
  phone: string,
  password: string
) => {
  try {
    const response = await axios.request({
      url: `${API_ENDPOINT}/auth/register`,
      method: "post",
      data: {
        name: fullName,
        username: "test",
        phone: parseFloat(phone),
        password,
        permitlogy: 0,
      },
    });
    return response.data ?? null;
  } catch (error) {
    console.log(error);
  }
  return null;
};