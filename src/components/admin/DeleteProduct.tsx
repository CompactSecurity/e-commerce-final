'use client'
import React, { useState, useEffect } from 'react';
import { FaTrash, FaSearch } from 'react-icons/fa';

interface DeleteProductProps {
    onBack: () => void;
}

interface Product {
    id_producto: number;
    nombre: string;
    precio: number;
    stock: number;
    imagen_principal: string;
    cotizable: number;
}

const DeleteProduct = ({ onBack }: DeleteProductProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('todos');

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products based on search term and product type
        let filtered = [...allProducts];
        
        // Filter by type first
        if (filterType !== 'todos') {
            const isCotizable = filterType === 'cotizable';
            filtered = filtered.filter(product => {
                const productIsCotizable = product.cotizable === 1 || (product.stock === 0 && product.precio === 0);
                return isCotizable ? productIsCotizable : !productIsCotizable;
            });
        }
        
        // Then filter by search term
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(product => 
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        setProducts(filtered);
    }, [searchTerm, allProducts, filterType]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/productos/get-all', {
                credentials: 'include'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setProducts(data.data);
                setAllProducts(data.data);
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
                    const updatedProducts = allProducts.filter(product => product.id_producto !== id);
                    setAllProducts(updatedProducts);
                    setProducts(updatedProducts.filter(product => 
                        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                    ));
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
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                    ✕
                </button>
            </div>

            {/* Search and filter bar */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search input */}
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Buscar productos por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    
                    {/* Filter select */}
                    <div className="md:w-64">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option value="todos">Todos los productos</option>
                            <option value="carrito">Agregables al carrito</option>
                            <option value="cotizable">Cotizables</option>
                        </select>
                    </div>
                </div>
                
                {/* Filter info text */}
                <div className="mt-2 text-sm text-gray-600">
                    Mostrando {products.length} de {allProducts.length} productos
                    {filterType !== 'todos' && (
                        <span> ({filterType === 'cotizable' ? 'cotizables' : 'agregables al carrito'})</span>
                    )}
                    {searchTerm && <span> que contienen &quot;{searchTerm}&quot;</span>}
                </div>
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
                                Tipo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.length > 0 ? (
                            products.map((product) => (
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
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            product.cotizable === 1 || (product.stock === 0 && product.precio === 0)
                                                ? 'bg-blue-100 text-blue-800' 
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {product.cotizable === 1 || (product.stock === 0 && product.precio === 0) 
                                                ? 'Cotizable' 
                                                : 'Agregable al carrito'}
                                        </span>
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                    {searchTerm || filterType !== 'todos' 
                                        ? 'No se encontraron productos con los filtros seleccionados' 
                                        : 'No hay productos disponibles'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeleteProduct;