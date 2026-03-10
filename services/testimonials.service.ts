import { ICustomerRating } from "@/interfaces";
import http from "./http.service";
import Promisable from "./promisable.service";
import { ENDPOINTS } from "./api-client";

export const TestimonialsService = {
  getTestimonials: async () => {
    return await Promisable.asPromise(http.get(ENDPOINTS.RATINGS));
  },
  createRating: async (rating: Omit<ICustomerRating, "date">) => {
    return await Promisable.asPromise(http.post(ENDPOINTS.RATINGS, rating));
  },
  updateRating: async (id: string, rating: Partial<ICustomerRating>) => {
    return await Promisable.asPromise(http.put(`${ENDPOINTS.RATINGS}/${id}`, rating));
  },
  deleteRating: async (id: string) => {
    return await Promisable.asPromise(http.delete(`${ENDPOINTS.RATINGS}/${id}`));
  },
};
