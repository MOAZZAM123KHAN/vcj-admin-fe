"use client";

import {
    createContext,
    useContext,
    useState,
} from "react";

import { IGoldRate } from "@/interfaces";

interface GoldRateContextType {
    goldRate: IGoldRate | null;

    setGoldRate: React.Dispatch<
        React.SetStateAction<IGoldRate | null>
    >;
}

const GoldRateContext = createContext<
    GoldRateContextType | undefined
>(undefined);

export function GoldRateProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [goldRate, setGoldRate] =
        useState<IGoldRate | null>(null);

    return (
        <GoldRateContext.Provider
            value={{
                goldRate,
                setGoldRate,
            }}
        >
            {children}
        </GoldRateContext.Provider>
    );
}

export function useGoldRate() {
    const context = useContext(GoldRateContext);

    if (!context) {
        throw new Error(
            "useGoldRate must be used within GoldRateProvider"
        );
    }

    return context;
}