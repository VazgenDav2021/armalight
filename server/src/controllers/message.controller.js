import { messageService } from "../services/message.service.js";

export const messageController = {
  async create(req, res) {
    const msg = await messageService.create(req.body);
    res.status(201).json(msg);
  },

  async getAll(req, res) {
    const msgs = await messageService.findAll();
    res.json(msgs);
  },

  async getOne(req, res) {
    const msg = await messageService.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: "Not Found" });
    res.json(msg);
  },

  async update(req, res) {
    const updated = await messageService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not Found" });
    res.json(updated);
  },

  async remove(req, res) {
    const removed = await messageService.remove(req.params.id);
    if (!removed) return res.status(404).json({ error: "Not Found" });
    res.json({ success: true });
  },
};
