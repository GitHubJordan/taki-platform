import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../utils/env";

// 🔧 Criação da instância do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// 🚀 Interceptor para anexar o token automaticamente
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("@taki_access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("[API] Attached Authorization header");
      } else {
        console.log("[API] No token found — proceeding without Authorization header");
      }
    } catch (err) {
      console.error("[API] Error reading token from AsyncStorage:", err);
    }
    return config;
  },
  (error) => {
    console.error("[API] Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// 🚨 Interceptor para capturar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error") {
      console.error("[API] Network Error — check connection or server availability");
    } else if (error.code === "ECONNABORTED") {
      console.error("[API] Request timeout (15s)");
    } else if (error.response) {
      console.error("[API] Response error:", error.response.status, error.response.data);
    } else {
      console.error("[API] Unknown error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
