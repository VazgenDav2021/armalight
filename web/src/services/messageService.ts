import api from "@/lib/axios";

export interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface UpdateMessageData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const messageService = {
  async create(data: CreateMessageData) {
    const res = await api.post("/messages", data);
    return res.data as Message;
  },

  async getAll() {
    const res = await api.get("/messages", { withCredentials: true });
    return res.data as Message[];
  },

  async getOne(id: string) {
    const res = await api.get(`/messages/${id}`, { withCredentials: true });
    return res.data as Message;
  },

  async update(id: string, data: UpdateMessageData) {
    const res = await api.patch(`/messages/${id}`, data, {
      withCredentials: true,
    });
    return res.data as Message;
  },

  async remove(id: string) {
    const res = await api.delete(`/messages/${id}`, { withCredentials: true });
    return res.data;
  },
};
