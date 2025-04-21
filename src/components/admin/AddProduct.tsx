'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

interface AddProductProps {
    onBack: () => void;
}

interface ProductFormData {
    nombre: string;
    descripcion: string;
    precio: number;
    precio_oferta: number;
    stock: number;
    id_categoria: number;
    id_marca: number;
    imagen_principal: string;
    cotizable: number;
    agregable_carrito: number;
}

interface Category {
    id_categoria: number;
    nombre: string;
}

interface Brand {
    id: number;
    nombre: string;
}

const AddProduct = ({ onBack }: AddProductProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<ProductFormData>({
        nombre: '',
        descripcion: '',
        precio: 0,
        precio_oferta: 0,
        stock: 0,
        id_categoria: 0,
        id_marca: 0,
        imagen_principal: '',
        cotizable: 0,
        agregable_carrito: 1
    });

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/category/get-all');
            const data = await response.json();
            if (data.status === 'success') {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/marcas/get-all');
            const data = await response.json();
            if (data.status === 'success') {
                setBrands(data.data);
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value.toString());
            });

            if (selectedFile) {
                formDataToSend.append('imagen_principal', selectedFile);
            }

            const response = await fetch('http://localhost/e-commerce/api/productos/create', {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error("Server didn't return JSON");
            }

            const data = await response.json();
            if (data.status === 'success') {
                alert('Producto creado exitosamente');
                onBack();
            } else {
                alert(data.mensaje || 'Error al crear el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear el producto. Por favor, revise la consola para más detalles.');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Agregar Nuevo Producto</h2>
                <button
                    onClick={onBack}
                    className="text-gray-600 hover:text-gray-800"
                >
                    x
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Categoría
                        </label>
                        <select
                            value={formData.id_categoria}
                            onChange={(e) => setFormData({...formData, id_categoria: Number(e.target.value)})}
                            className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            {categories.map((category) => (
                                <option key={category.id_categoria} value={category.id_categoria}>
                                    {category.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Marca
                        </label>
                        <select
                            value={formData.id_marca}
                            onChange={(e) => setFormData({...formData, id_marca: Number(e.target.value)})}
                            className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        >
                            <option value="">Seleccionar marca</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Precio
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.precio}
                            onChange={(e) => setFormData({...formData, precio: Number(e.target.value)})}
                            className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Precio de oferta
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.precio_oferta}
                            onChange={(e) => setFormData({...formData, precio_oferta: Number(e.target.value)})}
                            className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Stock
                        </label>
                        <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                            className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Opciones de Venta
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.cotizable === 1}
                                    onChange={(e) => setFormData({...formData, cotizable: e.target.checked ? 1 : 0})}
                                    className="rounded text-orange-500 focus:ring-orange-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Producto cotizable</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.agregable_carrito === 1}
                                    onChange={(e) => setFormData({...formData, agregable_carrito: e.target.checked ? 1 : 0})}
                                    className="rounded text-orange-500 focus:ring-orange-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Se puede agregar al carrito</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                    </label>
                    <textarea
                        value={formData.descripcion}
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagen Principal
                    </label>
                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Seleccionar imagen
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            className="hidden"
                            accept="image/*"
                        />
                        {previewUrl && (
                            <div className="relative w-24 h-24">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center cursor-pointer"
                    >
                        <FaPlus className="mr-2" />
                        Agregar Producto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;