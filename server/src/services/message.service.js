import { Message } from "../models/Message.js";

export const messageService = {
  async create(data) {
    return Message.create(data);
  },

  async findAll() {
    return Message.find().sort({ createdAt: -1 });
  },

  async findById(id) {
    return Message.findById(id);
  },

  async update(id, updates) {
    return Message.findByIdAndUpdate(id, updates, { new: true });
  },

  async remove(id) {
    return Message.findByIdAndDelete(id);
  },
};
