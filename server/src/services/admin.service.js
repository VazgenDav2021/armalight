import { Admin } from "../models/Admin.js";

export const adminService = {
  async create(data) {
    return Admin.create(data);
  },

  async findByUsername(username) {
    return Admin.findOne({ username });
  },
};
