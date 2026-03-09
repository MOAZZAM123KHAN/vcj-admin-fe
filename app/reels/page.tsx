"use client";

import AdminLayout from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Loader2, Instagram, ExternalLink, Trash2, Edit } from "lucide-react";
import { IReel } from "@/interfaces";
import { useEffect, useState } from "react";
import { ReelsService } from "@/services/reels.service";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/utils/firebase";

export default function ReelsPage() {
    const [reels, setReels] = useState<IReel[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<Omit<IReel, "_id" | "createdAt" | "updatedAt">>({
        title: "",
        reelUrl: "",
        thumbnailUrl: "",
    });

    const fetchReels = async () => {
        setLoading(true);
        const [response, error] = await ReelsService.getReels();
        if (error) {
            toast.error("Failed to fetch reels");
        } else {
            setReels(response?.data?.data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchReels();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (file?: File | null) => {
        if (!file) return;
        setUploading(true);
        try {
            const url = (await uploadImage(file)) as string;
            setFormData((prev) => ({ ...prev, thumbnailUrl: url }));
            toast.success("Thumbnail uploaded");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.reelUrl || !formData.thumbnailUrl) {
            toast.error("Please fill all fields");
            return;
        }
        const [response, error] = await ReelsService.createReel(formData);
        if (error) {
            toast.error(error.message);
        } else {
            setOpen(false);
            fetchReels();
            resetForm();
            toast.success("Reel added successfully");
        }
    };

    const openEditModal = (reel: IReel) => {
        setEditingId(reel._id || null);
        setFormData({
            title: reel.title,
            reelUrl: reel.reelUrl,
            thumbnailUrl: reel.thumbnailUrl,
        });
        setEditOpen(true);
    };

    const handleUpdate = async () => {
        if (!editingId) return;
        const [response, error] = await ReelsService.updateReel(editingId, formData);
        if (error) {
            toast.error(error.message);
        } else {
            setEditOpen(false);
            fetchReels();
            resetForm();
            toast.success("Reel updated successfully");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this reel?")) return;
        const [response, error] = await ReelsService.deleteReel(id);
        if (error) {
            toast.error(error.message);
        } else {
            fetchReels();
            toast.success("Reel deleted");
        }
    };

    const resetForm = () => {
        setFormData({ title: "", reelUrl: "", thumbnailUrl: "" });
        setEditingId(null);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Instagram Reels</h1>
                        <p className="text-gray-500 mt-1">Manage content for "Seen on Instagram" section</p>
                    </div>
                    <Button onClick={() => { resetForm(); setOpen(true); }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Reel
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                ) : reels.length === 0 ? (
                    <Card className="p-10 text-center text-gray-500">No reels found. Add your first Instagram reel.</Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reels.map((reel) => (
                            <Card key={reel._id} className="overflow-hidden group">
                                <div className="relative aspect-video">
                                    <img src={reel.thumbnailUrl} alt={reel.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <a href={reel.reelUrl} target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:scale-110 transition-transform">
                                            <ExternalLink size={24} />
                                        </a>
                                    </div>
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg line-clamp-1">{reel.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => openEditModal(reel)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(reel._id!)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Reel</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Bridal Story Reel" />
                        </div>
                        <div className="space-y-2">
                            <Label>Instagram Reel URL</Label>
                            <Input name="reelUrl" value={formData.reelUrl} onChange={handleInputChange} placeholder="https://instagram.com/reels/..." />
                        </div>
                        <div className="space-y-2">
                            <Label>Thumbnail Image</Label>
                            <div className="flex gap-2">
                                <Input name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleInputChange} placeholder="Image URL" className="flex-1" />
                                <div className="relative">
                                    <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e.target.files?.[0])} />
                                    <Button variant="outline" type="button" disabled={uploading}>
                                        {uploading ? <Loader2 className="animate-spin h-4 w-4" /> : "Upload"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full" onClick={handleSubmit}>Create Reel</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Reel</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input name="title" value={formData.title} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>Instagram Reel URL</Label>
                            <Input name="reelUrl" value={formData.reelUrl} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>Thumbnail Image URL</Label>
                            <Input name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleInputChange} />
                        </div>
                        <Button className="w-full" onClick={handleUpdate}>Save Changes</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
