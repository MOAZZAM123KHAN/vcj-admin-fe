import http from "./http.service";
import Promisable from "./promisable.service";
import { IOrder } from "@/interfaces/order";
export const OrderService = {
  getOrders: async () => {
    http.setJWT();
    return await Promisable.asPromise(http.get("/orders"));
  },
  createOrder: async (order: Omit<IOrder, "id" | "createdAt" | "updatedAt">) => {
    http.setJWT();
    return await Promisable.asPromise(http.post("/orders", order));
  },
  updateOrder: async (id: string, payload: Partial<Pick<IOrder, "status" | "paymentStatus">>) => {
    http.setJWT();
    return await Promisable.asPromise(http.put(`/orders/${id}`, payload));
  },
};
