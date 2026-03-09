"use client";

import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Package, Plus, XCircle } from "lucide-react";

import ProductsList from "./_components/products-list";
import { ProductsService } from "@/services/products.service";
import { toast } from "sonner";
import { useProducts } from "@/context/products";
import { uploadImage } from "@/utils/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FILTERS } from "@/data/filters";
import { FilterSelect } from "@/components/FilterSelect";

export default function ProductsPage() {
  const { products, loading, setTrigger } = useProducts();

  const initialForm = {
    name: "",
    description: "",
    price: 0,
    offer: 0,
    discountedPrice: 0,
    category: "",
    material: "",
    gender: "",
    occasion: "",
    boughtQuantity: 0,
    stock: 1,
    priority: 0,
    expiryDate: "",
    tags: "",
    imageUrls: [""],
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [uploading, setUploading] = useState<Record<number, boolean>>({});

  const [filters, setFilters] = useState({
    category: "all",
    material: "all",
    gender: "all",
    occasion: "all",
  });

  const clearFilters = () =>
    setFilters({
      category: "all",
      material: "all",
      gender: "all",
      occasion: "all",
    });

  const isFiltering = Object.values(filters).some((v) => v !== "all");

  /* ------------------ PRICE CALCULATION ------------------ */

  useEffect(() => {
    const price = Number(formData.price) || 0;
    const offer = Math.min(Math.max(Number(formData.offer), 0), 100);
    const discounted = offer > 0 ? price - price * (offer / 100) : price;

    setFormData((prev) => ({
      ...prev,
      discountedPrice: Number(discounted.toFixed(2)),
    }));
  }, [formData.price, formData.offer]);

  /* ------------------ FILTERING ------------------ */

  const filteredProducts = useMemo(() => {
    return (products || []).filter((product) => {
      if (filters.category !== "all" && product.category !== filters.category)
        return false;
      if (filters.material !== "all" && product.material !== filters.material)
        return false;
      if (filters.gender !== "all" && product.gender !== filters.gender)
        return false;
      if (filters.occasion !== "all" && product.occasion !== filters.occasion)
        return false;
      return true;
    });
  }, [products, filters]);

  /* ------------------ INPUT HANDLER ------------------ */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  /* ------------------ IMAGE MANAGEMENT ------------------ */

  const handleImageChange = (index: number, value: string) => {
    setFormData((prev) => {
      const urls = [...prev.imageUrls];
      urls[index] = value;
      return { ...prev, imageUrls: urls };
    });
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""],
    }));
  };

  const removeImageField = (index: number) => {
    setFormData((prev) => {
      const urls = [...prev.imageUrls];
      urls.splice(index, 1);
      return { ...prev, imageUrls: urls.length ? urls : [""] };
    });
  };

  const handleImageUpload = async (index: number, file?: File | null) => {
    if (!file) return;
    setUploading((prev) => ({ ...prev, [index]: true }));
    try {
      const url = await uploadImage(file);
      if (!url) {
        toast.error("Image upload failed");
        return;
      }
      handleImageChange(index, url);
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading((prev) => ({ ...prev, [index]: false }));
    }
  };

  /* ------------------ SUBMIT ------------------ */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      toast.error("Name and category required");
      return;
    }

    const payload = {
      ...formData,
      expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageUrls: [...new Set(formData.imageUrls.filter(Boolean))],
    };

    const [response, error] = await ProductsService.createProduct(payload);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Product created successfully");
      setTrigger((prev: boolean) => !prev);
      setFormData(initialForm);
      setOpen(false);
    }
  };

  /* ------------------ LOADING ------------------ */

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-500">Manage your products</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Fill product details</DialogDescription>
              </DialogHeader>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" rows={3} value={formData.description} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" name="price" value={formData.price} onChange={handleChange} />
                  <p className="text-sm text-gray-500">
                    Discounted Price: <span className="font-medium text-slate-900">₹{formData.discountedPrice}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="offer">Offer %</Label>
                    <Input id="offer" type="number" name="offer" value={formData.offer} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" name="stock" value={formData.stock} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Admin Priority</Label>
                    <Input id="priority" type="number" name="priority" value={formData.priority} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" name="tags" placeholder="curated_exclusive, trending..." value={formData.tags} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData((p) => ({ ...p, category: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILTERS.category.filter((c) => c.value !== "all").map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Material</Label>
                    <Select value={formData.material || ""} onValueChange={(v) => setFormData((p) => ({ ...p, material: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILTERS.material.filter((c) => c.value !== "all").map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Gender</Label>
                    <Select value={formData.gender || ""} onValueChange={(v) => setFormData((p) => ({ ...p, gender: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILTERS.gender.filter((c) => c.value !== "all").map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Occasion</Label>
                    <Select value={formData.occasion || ""} onValueChange={(v) => setFormData((p) => ({ ...p, occasion: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILTERS.occasion.filter((c) => c.value !== "all").map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* IMAGE LINKS */}
                <div className="space-y-3">
                  <Label>Images</Label>
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input value={url} onChange={(e) => handleImageChange(index, e.target.value)} placeholder="Image URL" />
                      <div className="relative">
                        <Input type="file" className="w-[100px] opacity-0 absolute inset-0 cursor-pointer" onChange={(e) => handleImageUpload(index, e.target.files?.[0])} />
                        <Button type="button" variant="outline" size="sm" className="w-[100px] pointer-events-none">
                          {uploading[index] ? <Loader2 className="animate-spin h-4 w-4" /> : "Upload"}
                        </Button>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => removeImageField(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addImageField}>
                    Add Image URL
                  </Button>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-4 border rounded-lg flex flex-wrap gap-4 items-end shadow-sm">
          <FilterSelect
            label="Category"
            options={FILTERS.category}
            value={filters.category}
            onChange={(v) => setFilters((p) => ({ ...p, category: v }))}
          />
          <FilterSelect
            label="Material"
            options={FILTERS.material}
            value={filters.material}
            onChange={(v) => setFilters((p) => ({ ...p, material: v }))}
          />
          <FilterSelect
            label="Gender"
            options={FILTERS.gender}
            value={filters.gender}
            onChange={(v) => setFilters((p) => ({ ...p, gender: v }))}
          />
          <FilterSelect
            label="Occasion"
            options={FILTERS.occasion}
            value={filters.occasion}
            onChange={(v) => setFilters((p) => ({ ...p, occasion: v }))}
          />
          {isFiltering && (
            <Button variant="ghost" onClick={clearFilters} className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
              <XCircle className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* PRODUCTS */}
        {!products || products.length === 0 ? (
          <div className="p-20 text-center border rounded-lg bg-white">
            <Package className="mx-auto mb-3 text-gray-300 h-12 w-12" />
            <p className="text-gray-500 font-medium">No products match your criteria</p>
            {isFiltering && (
              <Button variant="link" onClick={clearFilters} className="mt-2 text-blue-600">
                Try clearing filters
              </Button>
            )}
          </div>
        ) : (
          <ProductsList filteredProducts={filteredProducts} />
        )}
      </div>
    </AdminLayout>
  );
}
