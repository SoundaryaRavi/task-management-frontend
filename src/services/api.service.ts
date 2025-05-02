import { LoginData, RegisterData } from "../types/user";
import api from "./api.interceptor";

// User
export const login = (data: LoginData) => api({ method: "POST", url: `user/login`, data });
export const register = (data: RegisterData) => api({ method: "POST", url: `user/register`, data });

// Task
export const taskList = () => api({ method: "GET", url: `tasks/` });
export const taskView = (id: any) => api({ method: "GET", url: `tasks/${id}` });
export const taskSave = (data: any) => api({ method: "POST", url: `tasks/`, data });
export const taskDelete = (id: any) => api({ method: "DELETE", url: `tasks/${id}` });
export const taskUpdate = (id: any, data: any) => api({ method: "PUT", url: `tasks/${id}`, data });