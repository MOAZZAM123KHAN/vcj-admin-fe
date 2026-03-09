import { IReel } from "@/interfaces";
import http from "./http.service";
import Promisable from "./promisable.service";

export const ReelsService = {
    getReels: async () => {
        return await Promisable.asPromise(http.get("/reels"));
    },
    createReel: async (reel: Omit<IReel, "_id">) => {
        return await Promisable.asPromise(http.post("/reels", reel));
    },
    updateReel: async (id: string, reel: Partial<IReel>) => {
        return await Promisable.asPromise(http.put(`/reels/${id}`, reel));
    },
    deleteReel: async (id: string) => {
        return await Promisable.asPromise(http.delete(`/reels/${id}`));
    },
};
