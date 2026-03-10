import { IReel } from "@/interfaces";
import http from "./http.service";
import Promisable from "./promisable.service";
import { ENDPOINTS } from "./api-client";

export const ReelsService = {
    getReels: async () => {
        return await Promisable.asPromise(http.get(ENDPOINTS.REELS));
    },
    createReel: async (reel: Omit<IReel, "_id">) => {
        return await Promisable.asPromise(http.post(ENDPOINTS.REELS, reel));
    },
    updateReel: async (id: string, reel: Partial<IReel>) => {
        return await Promisable.asPromise(http.put(`${ENDPOINTS.REELS}/${id}`, reel));
    },
    deleteReel: async (id: string) => {
        return await Promisable.asPromise(http.delete(`${ENDPOINTS.REELS}/${id}`));
    },
};
