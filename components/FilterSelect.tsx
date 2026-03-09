"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Option {
    label: string;
    value: string;
}

interface FilterSelectProps {
    label: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

export function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
    return (
        <div className="flex flex-col gap-1.5 min-w-[150px]">
            <Label className="text-xs font-medium text-gray-500">{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
