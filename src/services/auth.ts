import axios from "axios";
import { BASE_URL } from "./api";
import { LoginFormData, SignUpFormData } from "../types/type";


const AuthService = {
  async userLogin(user: LoginFormData) {
    const { data } = await axios.post(`${BASE_URL}/auths/sign-in`, user);
    return data;
  },

  async userRegister(data: SignUpFormData) {
    const response = await axios.post(`${BASE_URL}/auths/sign-up`, data);
    return response.data;
  }
};

export default AuthService;
