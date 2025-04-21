'use client'
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteProductProps {
    onBack: () => void;
}

interface Product {
    id_producto: number;
    nombre: string;
    precio: number;
    stock: number;
    imagen_principal: string;
}

const DeleteProduct = ({ onBack }: DeleteProductProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts();
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

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro de eliminar este producto?')) {
            try {
                const response = await fetch(`http://localhost/e-commerce/api/productos/delete/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('Server response:', errorData);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.status === 'success') {
                    alert('Producto eliminado exitosamente');
                    setProducts(products.filter(product => product.id_producto !== id));
                } else {
                    console.error('Server error:', data.mensaje);
                    throw new Error(data.mensaje || 'Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Delete error:', error);
                alert('Error al eliminar el producto. Por favor, intente nuevamente.');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Eliminar Productos</h2>
                <button
                    onClick={onBack}
                    className="text-gray-600 hover:text-gray-800"
                >
                    ✕
                </button>
            </div>

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
                                        onClick={() => handleDelete(product.id_producto)}
                                        className="text-red-600 hover:text-red-900 flex items-center cursor-pointer"
                                    >
                                        <FaTrash className="mr-1 cursor-pointer" />
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeleteProduct;