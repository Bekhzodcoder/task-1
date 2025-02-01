import axios from "axios";
import { BASE_URL } from "./api";
const AuthService = {
    async userLogin(user) {
        const { data } = await axios.post(`${BASE_URL}/auths/sign-in`, user);
        return data;
    },
    async userRegister(data) {
        const response = await axios.post(`${BASE_URL}/auths/sign-up`, data);
        return response.data;
    }
};
export default AuthService;
