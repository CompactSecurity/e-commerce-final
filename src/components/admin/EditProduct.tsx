'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';

interface EditProductProps {
    onBack: () => void;
}

interface Product {
    id_producto: number;
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
    estado: number;
}

interface Category {
    id_categoria: number;
    nombre: string;
}

interface Brand {
    id: number;
    nombre: string;
}

const EditProduct = ({ onBack }: EditProductProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/productos/get-all', {
                credentials: 'include'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setProducts(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/category/get-all', {
                credentials: 'include'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/marcas/get-all', {
                credentials: 'include'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setBrands(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
        setPreviewUrl(product.imagen_principal ? 
            `http://localhost/e-commerce/uploads/productos/${product.imagen_principal}` : '');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!selectedProduct) return;
        
        const { name, value, type } = e.target as HTMLInputElement;
        
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setSelectedProduct(prev => ({
                ...prev!,
                [name]: checked ? 1 : 0
            }));
        } else {
            setSelectedProduct(prev => ({
                ...prev!,
                [name]: value
            }));
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
    
        try {
            const formData = new FormData();
            
            // Create a copy of selectedProduct without modifying the original state
            const productToUpdate = {...selectedProduct};
            
            // Only include cotizable if explicitly checked
            if (!productToUpdate.cotizable) {
                productToUpdate.cotizable = 0;
            }
            
            // Add all product fields to formData
            Object.entries(productToUpdate).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value.toString());
                }
            });
    
            if (selectedFile) {
                formData.append('imagen_principal', selectedFile);
            }
    
            const response = await fetch(`http://localhost/e-commerce/api/productos/update/${selectedProduct.id_producto}`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('Server error response:', errorData);
                throw new Error(errorData?.mensaje || `HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Update response:', data);
            
            if (data.status === 'success') {
                alert('Producto actualizado exitosamente');
                setSelectedProduct(null);
                fetchProducts();
            } else {
                throw new Error(data.mensaje || 'Error al actualizar el producto');
            }
        } catch (error) {
            console.error('Detailed error:', error);
            alert(`Error al actualizar el producto: ${error instanceof Error ? error.message : 'Error desconocido'}\nVer consola para más detalles.`);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Editar Productos</h2>
                <button
                    onClick={onBack}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                    ✕
                </button>
            </div>

            {!selectedProduct ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Imagen
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id_producto}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={`http://localhost/e-commerce/uploads/productos/${product.imagen_principal}`}
                                            alt={product.nombre}
                                            className="h-10 w-10 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {product.nombre}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            S/ {product.precio.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {product.stock}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleSelectProduct(product)}
                                            className="text-orange-600 hover:text-orange-900 flex items-center cursor-pointer"
                                        >
                                            <FaEdit className="mr-1" />
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={selectedProduct.nombre}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoría
                            </label>
                            <select
                                name="id_categoria"
                                value={selectedProduct.id_categoria}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                required
                            >
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
                                name="id_marca"
                                value={selectedProduct.id_marca}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                required
                            >
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Precio de Oferta
                            </label>
                            <input
                                type="number"
                                name="precio"
                                value={selectedProduct.precio}
                                onChange={handleInputChange}
                                step="0.01"
                                className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Precio Normal
                            </label>
                            <input
                                type="number"
                                name="precio_oferta"
                                value={selectedProduct.precio_oferta || ''}
                                onChange={handleInputChange}
                                step="0.01"
                                className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={selectedProduct.stock}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={selectedProduct.descripcion}
                            onChange={handleInputChange}
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
                                Cambiar imagen
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="cotizable"
                                checked={selectedProduct.cotizable === 1}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Producto cotizable
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="agregable_carrito"
                                checked={selectedProduct.agregable_carrito === 1}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Se puede agregar al carrito
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="estado"
                                checked={selectedProduct.estado === 1}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Activo
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setSelectedProduct(null)}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center cursor-pointer"
                        >
                            <FaSave className="mr-2" />
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditProduct;
