import API from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  telefone: string;
  email: string;
  password: string;
  confirm: string;
  tipo: string;
}

export interface UserProfile {
  id: string;
  email: string;
  tipo: string;
  createdAt: string;
  updatedAt: string;
}

// Login
export async function login(credentials: LoginCredentials): Promise<{ token: string }> {
  const { data } = await API.post<{ token: string }>("/auth/login", credentials);
  localStorage.setItem("token", data.token);
  return data;
}

// Registro
export async function register(userData: RegisterData): Promise<{ message: string }> {
  const { data } = await API.post<{ message: string }>("/auth/register", userData);
  return data;
}

// Perfil
export async function getProfile(): Promise<UserProfile> {
  const { data } = await API.get<UserProfile>("/auth/me");
  return data;
}

// Logout
export function logout() {
  localStorage.removeItem("token");
}
