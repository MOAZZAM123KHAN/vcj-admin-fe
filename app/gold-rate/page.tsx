"use client";

import AdminLayout from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IGoldRate {
    _id?: string;
    date: string;
    gold18k: number;
    gold22k: number;
    gold24k: number;
}

export default function GoldRatePage() {
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState<IGoldRate>({
        date: "",
        gold18k: 0,
        gold22k: 0,
        gold24k: 0,
    });

    // FETCH EXISTING DATA
    const fetchGoldRate = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                "https://vcj-backend.vercel.app/api/gold-rate/latest"
            );

            const data = await res.json();

            if (data?.data) {
                setFormData(data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch gold rates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoldRate();
    }, []);

    // HANDLE INPUT
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.name === "date"
                    ? e.target.value
                    : Number(e.target.value),
        });
    };

    // UPDATE DATA
    const handleSubmit = async () => {
        try {
            setLoading(true);

            // Strip _id and other mongodb fields to avoid duplicate key errors on POST
            const payload = {
                date: formData.date,
                gold18k: formData.gold18k,
                gold22k: formData.gold22k,
                gold24k: formData.gold24k,
            };

            const res = await fetch(
                "https://vcj-backend.vercel.app/api/gold-rate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success("Gold rate updated");

            setOpen(false);

            fetchGoldRate();
        } catch (error: any) {
            toast.error(error.message || "Failed to update");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Gold Rate Management
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Update daily gold rates
                        </p>
                    </div>

                    <Button onClick={() => setOpen(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update Rates
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Date</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <p className="text-lg font-semibold">
                                    {formData.date || "-"}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>18K Gold</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <p className="text-2xl font-bold text-yellow-600">
                                    ₹{formData.gold18k}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>22K Gold</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <p className="text-2xl font-bold text-yellow-600">
                                    ₹{formData.gold22k}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>24K Gold</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <p className="text-2xl font-bold text-yellow-600">
                                    ₹{formData.gold24k}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Gold Rates</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Date</Label>

                            <Input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>18K Gold Rate</Label>

                            <Input
                                type="number"
                                name="gold18k"
                                value={formData.gold18k}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>22K Gold Rate</Label>

                            <Input
                                type="number"
                                name="gold22k"
                                value={formData.gold22k}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>24K Gold Rate</Label>

                            <Input
                                type="number"
                                name="gold24k"
                                value={formData.gold24k}
                                onChange={handleChange}
                            />
                        </div>

                        <Button
                            className="w-full"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Save Rates"
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}