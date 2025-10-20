import api from "@/app/utils/axios";
import { Category } from "@/types";

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>("/categories");
    return data;
  },
};
