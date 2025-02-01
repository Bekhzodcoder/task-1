import axios from "axios";
import { BASE_URL } from "./api";
import { CompanyData } from "../types/type";

const Company = {
    get: async (token: string, search: string) => {
        const response = await axios.get(
            `${BASE_URL}/companies/get-all?search=${search}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    },

    post: async (data: CompanyData, token: string) => {
        const response = await axios.post(
            `${BASE_URL}/companies/add`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    },
    put: async ( data: CompanyData, token: string) => {
        const response = await axios.put(
            `${BASE_URL}/companies/update`,
                data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    },

    delete: async (id: string, token: string) => {
        const response = await axios.delete(
          `${BASE_URL}/companies/delete/by-id`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            data: id,
          }
        );
        return response.data;
      }      
}

export default Company