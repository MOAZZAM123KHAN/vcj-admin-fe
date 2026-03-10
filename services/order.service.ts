import http, { API_BASE } from "./http.service";
import Promisable from "./promisable.service";
import { IOrder } from "@/interfaces/order";

export const OrderService = {
  getOrders: async () => {
    http.setJWT();
    return await Promisable.asPromise(http.get(`${API_BASE}/orders`));
  },
  createOrder: async (order: Omit<IOrder, "id" | "createdAt" | "updatedAt">) => {
    http.setJWT();
    return await Promisable.asPromise(http.post(`${API_BASE}/orders`, order));
  },
  updateOrder: async (id: string, payload: Partial<Pick<IOrder, "status" | "paymentStatus">>) => {
    http.setJWT();
    return await Promisable.asPromise(http.put(`${API_BASE}/orders/${id}`, payload));
  },
};
