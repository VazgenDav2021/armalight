import { GuestOrder } from "../models/GuestOrder.js";

export const guestOrderService = {
  async create(order) {
    return GuestOrder.create(order);
  },

  async findById(id) {
    return GuestOrder.findById(id);
  },
};
