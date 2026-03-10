import { IReel } from "@/interfaces";
import http, { API_BASE } from "./http.service";
import Promisable from "./promisable.service";

export const ReelsService = {
    getReels: async () => {
        return await Promisable.asPromise(http.get(`${API_BASE}/reels`));
    },
    createReel: async (reel: Omit<IReel, "_id">) => {
        return await Promisable.asPromise(http.post(`${API_BASE}/reels`, reel));
    },
    updateReel: async (id: string, reel: Partial<IReel>) => {
        return await Promisable.asPromise(http.put(`${API_BASE}/reels/${id}`, reel));
    },
    deleteReel: async (id: string) => {
        return await Promisable.asPromise(http.delete(`${API_BASE}/reels/${id}`));
    },
};
