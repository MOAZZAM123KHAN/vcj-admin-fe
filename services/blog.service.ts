import { IBlog } from "@/interfaces/blog";
import http from "./http.service";
import Promisable from "./promisable.service";

export const BlogService = {
  getBlogs: async () => {
    return await Promisable.asPromise(http.get("/blogs"));
  },
  createBlog: async (blog: Omit<IBlog, "_id" | "createdAt" | "updatedAt">) => {
    return await Promisable.asPromise(http.post("/blogs", blog));
  },
  updateBlog: async (id: string, blog: Omit<IBlog, "_id" | "createdAt" | "updatedAt">) => {
    return await Promisable.asPromise(http.patch(`/blogs/${id}`, blog));
  },
  deleteBlog: async (id: string) => {
    return await Promisable.asPromise(http.delete(`/blogs/${id}`));
  },
};
