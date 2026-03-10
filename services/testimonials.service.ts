import { ICustomerRating } from "@/interfaces";
import http, { API_BASE } from "./http.service";
import Promisable from "./promisable.service";

export const TestimonialsService = {
  getTestimonials: async () => {
    return await Promisable.asPromise(http.get(`${API_BASE}/ratings`));
  },
  createRating: async (rating: Omit<ICustomerRating, "date">) => {
    return await Promisable.asPromise(http.post(`${API_BASE}/ratings`, rating));
  },
  updateRating: async (id: string, rating: Partial<ICustomerRating>) => {
    return await Promisable.asPromise(http.put(`${API_BASE}/ratings/${id}`, rating));
  },
  deleteRating: async (id: string) => {
    return await Promisable.asPromise(http.delete(`${API_BASE}/ratings/${id}`));
  },
};
