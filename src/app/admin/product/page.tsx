'use client';
import { useEffect, useState } from 'react';
import style from '@/app/admin/product/page.module.css';
import { Product, ProductForm } from '@/types/products';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProductPage() {
    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProductForm>({
        id: 0,
        name: '',
        price: '',
        discount: '',
        image: ''
    });
    const [product, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(product.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = product.slice(startIndex, startIndex + itemsPerPage);
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/user/product');
        if (!response.ok) {
            toast.error('Unable to load product data.');
        }
        const data = await response.json();
        setProducts(data);
    }
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setFormData({ ...formData, image: file })
    };
    const uploadImageIfNeed = async () => {
        if (formData.image instanceof File) {
            const formDataUpload = new FormData();
            formDataUpload.append("file", formData.image);
            const response = await fetch("/api/user/product/upload", {
                method: "POST",
                body: formDataUpload,
            })
            const data = await response.json();
            if (data.success) {
                return data.imageUrl;
            }
            else {
                toast.error('Upload image failed.')
            }
        }
        return formData.image;
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const imageUrl = await uploadImageIfNeed();
            if (!imageUrl) {
                return;
            }
            const response = await fetch('/api/user/product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    price: parseFloat(formData.price),
                    discount: parseInt(formData.discount) || 0,
                    image: imageUrl
                })
            });
            if (!response.ok) {
                toast.error('Failed to add product.');
                return;
            }
            await fetchProducts();
            toast.success('Product added successfully.');
            setShowModal(false);
            setFormData({ id: 0, name: '', price: '', discount: '', image: '' });
            setImagePreview(null);
        }
        catch (err) {
            toast.error('Error while adding product.')
        }
    };
    const handleEditProduct = (product: Product) => {
        setEditing(true);
        setShowModal(true);
        setFormData({
            id: product.id,
            name: product.name,
            price: product.price.toString(),
            discount: product.discount?.toString() || '',
            image: product.image || ''
        });
        setImagePreview(product.image);
    };
    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const imageUrl = await uploadImageIfNeed();
            if (!imageUrl) {
                return;
            }
            const response = await fetch(`/api/user/product/${formData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: formData.id,
                    name: formData.name,
                    price: parseFloat(formData.price),
                    discount: parseInt(formData.discount) || 0,
                    image: imageUrl
                })
            });
            if (!response.ok) {
                toast.error('Failed to update product.');
                return;
            }
            await fetchProducts();
            toast.success('Product updated successfully.');
            setShowModal(false);
            setFormData({ id: 0, name: '', price: '', discount: '', image: '' });
            setImagePreview(null);
            setEditing(false);
        }
        catch (err) {
            toast.error('Error while updating product.')
        }
    };
    const handleDeleteProduct = async (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`/api/user/product/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    toast.error('Failed to delete product.');
                    return;
                }
                await fetchProducts();
                toast.success('Product deleted successfully.');
            }
            catch (err) {
                toast.error('Error while adding product.')
            }
        }
    };
    return (
        <div className={style["page-container"]}>
            <h1 className={style["title"]}>🛍️ Product Management</h1>
            <p className={style["desc"]}>Add, edit, and manage your store products easily.</p>
            <button className={style["btn-primary"]} onClick={() => { setShowModal(true); setEditing(false) }}>
                ➕ Add Product
            </button>
            <table className={style["table"]} style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.length > 0 ? (currentProducts.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.image ? <img src={p.image} alt={p.name} className={style["product-img"]} /> : <span>No image</span>}</td>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>{p.discount ? `${p.discount}%` : 'N/A'}</td>
                            <td className={style["actions"]}>
                                <button className={style["btn-edit"]} onClick={() => handleEditProduct(p)}>Edit</button>
                                <button className={style["btn-delete"]} onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                            </td>
                        </tr>
                    ))) :
                        (
                            <tr>
                                <td colSpan={7} className={style["no-data"]}>
                                    No products found
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            {showModal && (
                <div className={style["modal-overlay"]}>
                    <div className={style["modal"]}>
                        <h2>{editing ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={editing ? handleUpdateProduct : handleAddProduct} className={style["form"]}>
                            <label>Product Name</label>
                            <input type="text" name="name" placeholder="Enter product name" value={formData.name} onChange={handleChange} required />
                            <label>Price</label>
                            <input type="number" name="price" placeholder="Enter price" value={formData.price} onChange={handleChange} required />
                            <label>Discount (optional)</label>
                            <input type="number" name="discount" placeholder="Enter discount" value={formData.discount} onChange={handleChange} />
                            <label>Product Image</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className={style["preview-img"]} />
                            )}

                            <div className={style["modal-actions"]}>
                                <button type="submit" className={style["btn-primary"]}>{editing ? 'Update' : 'Save'}</button>
                                <button type="button" className={style["btn-cancel"]} onClick={() => {
                                    setShowModal(false);
                                    setFormData({ id: 0, name: '', price: '', discount: '', image: '' });
                                    setImagePreview(null);
                                    setEditing(false);
                                }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div >
            )}
            <div className={style["pagination"]}>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    ← Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                    Next →
                </button>
            </div>
            <ToastContainer />
        </div >
    );
}
