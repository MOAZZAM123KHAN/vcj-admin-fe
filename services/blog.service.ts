import { IBlog } from "@/interfaces/blog";
import http, { API_BASE } from "./http.service";
import Promisable from "./promisable.service";

export const BlogService = {
  getBlogs: async () => {
    return await Promisable.asPromise(http.get(`${API_BASE}/blogs`));
  },
  createBlog: async (blog: Omit<IBlog, "_id" | "createdAt" | "updatedAt">) => {
    return await Promisable.asPromise(http.post(`${API_BASE}/blogs`, blog));
  },
  updateBlog: async (id: string, blog: Omit<IBlog, "_id" | "createdAt" | "updatedAt">) => {
    return await Promisable.asPromise(http.patch(`${API_BASE}/blogs/${id}`, blog));
  },
  deleteBlog: async (id: string) => {
    return await Promisable.asPromise(http.delete(`${API_BASE}/blogs/${id}`));
  },
};
