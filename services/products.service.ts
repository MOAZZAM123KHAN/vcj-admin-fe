import axios from "axios";
import { IProduct } from "../interfaces/product";
import Promisable from "./promisable.service";
import http from "./http.service";

export const ProductsService = {
  getProducts: async () => {
    return await Promisable.asPromise(http.get("/products"));
  },
  createProduct: async (product: IProduct) => {
    return await Promisable.asPromise(http.post("/products", product));
  },
  updateProduct: async (id: string, product: IProduct) => {
    return await Promisable.asPromise(http.put(`/products/${id}`, product));
  },
  deleteProduct: async (id: string) => {
    return await Promisable.asPromise(http.delete(`/products/${id}`));
  },
};
