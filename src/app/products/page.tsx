"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductTable from "@/features/products/product-table";
import AddProductForm from "@/features/crud/AddProductForm";
import EditProductForm from "@/features/crud/EditProductForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Product from "@/features/products/domains/Product";

interface ApiProduct {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
}

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.push("/login");
        } else {
          fetchProducts();
        }
    }, [router]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch("http://127.0.0.1:8000/api/products/", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data: ApiProduct[] = await response.json();
            const transformedData: Product[] = data.map((item) => ({
                ID: item.id.toString(),
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                price: item.price,
            }));
            setProducts(transformedData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = (newProduct: Product) => {
        setProducts([...products, newProduct]);
        setShowAddForm(false);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setShowEditForm(true);
    };

    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(products.map((p) => (p.ID === updatedProduct.ID ? updatedProduct : p)));
        setShowEditForm(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async (id: string) => {
        try {
            
            const token = localStorage.getItem("access_token");
            const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete product");
            }
            setProducts(products.filter((p) => p.ID !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-6 px-12">Loading...</div>;
    }

    return (
        <div className="py-4 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-12">
            <h3 className="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight mb-4 sm:mb-6">
                Inventory Products
            </h3>
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle>
                                <h4 className="scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight">
                                    Product List
                                </h4>
                            </CardTitle>
                            <CardDescription>Manage your inventory products</CardDescription>
                        </div>
                        <Button variant="default" onClick={() => setShowAddForm(true)}>
                            Add Product
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <ProductTable
                            data={products}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                        />
                    </div>
                </CardContent>
            </Card>
            {showAddForm && (
                <AddProductForm
                    onAdd={handleAddProduct}
                    onClose={() => setShowAddForm(false)}
                />
            )}
            {showEditForm && selectedProduct && (
                <EditProductForm
                    product={selectedProduct}
                    onUpdate={handleUpdateProduct}
                    onClose={() => {
                        setShowEditForm(false);
                        setSelectedProduct(null);
                    }}
                />
            )}
        </div>
    );
}