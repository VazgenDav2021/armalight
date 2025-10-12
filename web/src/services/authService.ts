import api from "@/lib/axios";

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface VerifyData {
  email: string;
  code: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
}

export const authService = {
  async register(data: RegisterData) {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  async verify(data: VerifyData) {
    const res = await api.post("/auth/verify", data);
    return res.data;
  },

  async login(data: LoginData) {
    const res = await api.post("/auth/login", data, { withCredentials: true });
    return res.data;
  },

  async logout() {
    const res = await api.post("/auth/logout", {}, { withCredentials: true });
    return res.data;
  },

  async forgotPassword(data: ForgotPasswordData) {
    const res = await api.post("/auth/forgot-password", data);
    return res.data;
  },

  async resetPassword(data: ResetPasswordData) {
    const res = await api.post("/auth/reset-password", data);
    return res.data;
  },

  async getMe() {
    const res = await api.get("/auth/me", { withCredentials: true });
    return res.data;
  },

  async updateProfile(data: UpdateProfileData) {
    const res = await api.put("/auth/me", data, { withCredentials: true });
    return res.data;
  },
};
