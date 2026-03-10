export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://vcj-backend.vercel.app/api";

export const ENDPOINTS = {
    PRODUCTS: "/products",
    ORDERS: "/orders",
    BLOGS: "/blogs",
    RATINGS: "/ratings",
    REELS: "/reels",
    LOGIN: "/users/login",
} as const;
