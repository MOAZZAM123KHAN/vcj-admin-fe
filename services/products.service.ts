import { IProduct } from "../interfaces/product";
import Promisable from "./promisable.service";
import http from "./http.service";
import { ENDPOINTS } from "./api-client";

export const ProductsService = {
  getProducts: async () => {
    return await Promisable.asPromise(http.get(ENDPOINTS.PRODUCTS));
  },
  createProduct: async (product: IProduct) => {
    return await Promisable.asPromise(http.post(ENDPOINTS.PRODUCTS, product));
  },
  updateProduct: async (id: string, product: IProduct) => {
    return await Promisable.asPromise(http.put(`${ENDPOINTS.PRODUCTS}/${id}`, product));
  },
  deleteProduct: async (id: string) => {
    return await Promisable.asPromise(http.delete(`${ENDPOINTS.PRODUCTS}/${id}`));
  },
};
