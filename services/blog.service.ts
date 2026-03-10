import { IBlog } from "@/interfaces/blog";
import http from "./http.service";
import Promisable from "./promisable.service";
import { ENDPOINTS } from "./api-client";

export const BlogService = {
  getBlogs: async () => {
    return await Promisable.asPromise(http.get(ENDPOINTS.BLOGS));
  },
  createBlog: async (blog: Omit<IBlog, "_id" | "createdAt" | "updatedAt">) => {
    return await Promisable.asPromise(http.post(ENDPOINTS.BLOGS, blog));
  },
  updateBlog: async (id: string, blog: Omit<IBlog, "_id" | "createdAt" | "updatedAt">) => {
    return await Promisable.asPromise(http.patch(`${ENDPOINTS.BLOGS}/${id}`, blog));
  },
  deleteBlog: async (id: string) => {
    return await Promisable.asPromise(http.delete(`${ENDPOINTS.BLOGS}/${id}`));
  },
};
