import http from "./http.service";
import Promisable from "./promisable.service";
import { IOrder } from "@/interfaces/order";
import { ENDPOINTS } from "./api-client";

export const OrderService = {
  getOrders: async () => {
    http.setJWT();
    return await Promisable.asPromise(http.get(ENDPOINTS.ORDERS));
  },
  createOrder: async (order: Omit<IOrder, "id" | "createdAt" | "updatedAt">) => {
    http.setJWT();
    return await Promisable.asPromise(http.post(ENDPOINTS.ORDERS, order));
  },
  updateOrder: async (id: string, payload: Partial<Pick<IOrder, "status" | "paymentStatus">>) => {
    http.setJWT();
    return await Promisable.asPromise(http.put(`${ENDPOINTS.ORDERS}/${id}`, payload));
  },
};
