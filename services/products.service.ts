import { IProduct } from "../interfaces/product";
import Promisable from "./promisable.service";
import http, { API_BASE } from "./http.service";

export const ProductsService = {
  getProducts: async () => {
    return await Promisable.asPromise(http.get(`${API_BASE}/products`));
  },
  createProduct: async (product: IProduct) => {
    return await Promisable.asPromise(http.post(`${API_BASE}/products`, product));
  },
  updateProduct: async (id: string, product: IProduct) => {
    return await Promisable.asPromise(http.put(`${API_BASE}/products/${id}`, product));
  },
  deleteProduct: async (id: string) => {
    return await Promisable.asPromise(http.delete(`${API_BASE}/products/${id}`));
  },
};
