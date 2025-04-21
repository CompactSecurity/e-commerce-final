'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaStar, FaShoppingCart, FaFilter, FaTimes } from 'react-icons/fa';
import { IoGrid, IoList } from 'react-icons/io5';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import casco from '../../assets/Categorias/facial.jpg';
import guantes from '../../assets/Categorias/cabeza.jpg';
import lentes from '../../assets/Categorias/manos.jpg';

// Tipos de datos
interface Product {
    id_producto: number;
    nombre: string;
    precio: number;
    precio_oferta: number;
    imagen_principal: string;
    descripcion: string;
    id_categoria: number;
    id_marca: number;
    stock: number;
    cotizable: number;
    agregable_carrito: number;
    estado: number;
}

interface Category {
    id_categoria: number;
    nombre: string;
}

interface Brand {
    id_marca: number;
    nombre: string;
}

// Add this interface before the ShopPage component
interface FilterOptions {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
    ratings: number[];
    sortBy: string;
}

const ShopPage = () => {
    // Add these new states with the existing ones
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Add these new functions after the existing ones
    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({
        categories: [],
        brands: [],
        priceRange: [0, 1000],
        ratings: [],
        sortBy: 'newest'
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes, brandsRes] = await Promise.all([
                    fetch('http://localhost/e-commerce/api/productos/get-all'),
                    fetch('http://localhost/e-commerce/api/category/getAll'),
                    fetch('http://localhost/e-commerce/api/marca/getAll')
                ]);

                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();
                const brandsData = await brandsRes.json();

                // Check if the responses contain the data property
                setProducts(Array.isArray(productsData.data) ? productsData.data : []);
                setCategories(Array.isArray(categoriesData.data) ? categoriesData.data : []);
                setBrands(Array.isArray(brandsData.data) ? brandsData.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Initialize with empty arrays on error
                setProducts([]);
                setCategories([]);
                setBrands([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Add the missing handleFilterChange function
    const handleFilterChange = (filterType: keyof typeof filters, value: any) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    // Función para cerrar filtros en móvil
    const closeMobileFilters = () => {
        setShowMobileFilters(false);
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesCategory = filters.categories.length === 0 || 
            filters.categories.includes(String(product.id_categoria));
        const matchesBrand = filters.brands.length === 0 ||
            filters.brands.includes(String(product.id_marca));
        const matchesPrice = product.precio >= filters.priceRange[0] && 
            product.precio <= filters.priceRange[1];
        const matchesSearch = product.nombre.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (filters.sortBy) {
            case 'price-asc':
                return a.precio - b.precio;
            case 'price-desc':
                return b.precio - a.precio;
            default:
                return b.id_producto - a.id_producto; // Newest first
        }
    });
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header de la tienda */}
            <div className="bg-white shadow-sm mt-[70px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Tienda</h1>
                    <p className="mt-1 text-gray-600">
                        Encuentra los mejores productos de seguridad industrial
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Botón de filtros móvil */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50"
                    >
                        <FaFilter className="w-4 h-4" />
                        <span>Mostrar Filtros</span>
                    </button>
                </div>

                {/* Overlay para móvil */}
                {showMobileFilters && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={closeMobileFilters}
                    />
                )}

                <div className="flex flex-col lg:flex-row lg:gap-8">
                    {/* Sidebar de filtros */}
                    <div
                        className={`
                            lg:block lg:w-64 lg:flex-shrink-0
                            ${!showMobileFilters && 'hidden'}
                            fixed inset-y-0 left-0 w-full max-w-xs bg-white z-50 transform transition-transform duration-300 ease-in-out
                            lg:static lg:inset-auto lg:transform-none lg:max-w-none lg:z-0
                        `}
                    >
                        <div className="h-full overflow-y-auto lg:h-auto">
                            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                                {/* Botón cerrar en móvil */}
                                <div className="flex justify-between items-center lg:hidden">
                                    <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
                                    <button
                                        onClick={closeMobileFilters}
                                        className="p-2 text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Contenido de filtros existente */}
                                {/* Búsqueda */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Buscar
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Buscar productos..."
                                        />
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                {/* Marcas */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Marcas</h3>
                                    <div className="space-y-2 max-h-48 overflow-auto pr-2">
                                        {brands.map((brand) => (
                                            <label key={brand.id_marca} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.brands.includes(String(brand.id_marca))}
                                                    onChange={(e) => {
                                                        const newBrands = e.target.checked
                                                            ? [...filters.brands, String(brand.id_marca)]
                                                            : filters.brands.filter(b => b !== String(brand.id_marca));
                                                        handleFilterChange('brands', newBrands);
                                                    }}
                                                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{brand.nombre}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Categorías */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Categorías</h3>
                                    <div className="space-y-2 max-h-48 overflow-auto pr-2">
                                        {categories.map((category) => (
                                            <label key={category.id_categoria} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.categories.includes(String(category.id_categoria))}
                                                    onChange={(e) => {
                                                        const newCategories = e.target.checked
                                                            ? [...filters.categories, String(category.id_categoria)]
                                                            : filters.categories.filter(c => c !== String(category.id_categoria));
                                                        handleFilterChange('categories', newCategories);
                                                    }}
                                                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{category.nombre}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Rango de precios */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Rango de precios</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                value={filters.priceRange[0]}
                                                onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="Min"
                                            />
                                            <span>-</span>
                                            <input
                                                type="number"
                                                value={filters.priceRange[1]}
                                                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="Max"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => handleFilterChange('priceRange', [0, 1000])}
                                            className="text-sm text-orange-500 hover:text-orange-600"
                                        >
                                            Limpiar
                                        </button>
                                    </div>
                                </div>

                                {/* Botón para limpiar filtros */}
                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => {
                                            setFilters({
                                                categories: [],
                                                brands: [],
                                                priceRange: [0, 1000],
                                                ratings: [],
                                                sortBy: 'newest'
                                            });
                                            setSearchQuery('');
                                        }}
                                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Limpiar todos los filtros
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="flex-1 min-w-0">
                        {/* Controles de vista y ordenamiento */}
                        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg flex-1 sm:flex-none ${viewMode === 'grid' ? 'bg-orange-100 text-orange-500' : 'text-gray-500'}`}
                                    >
                                        <IoGrid className="w-5 h-5 mx-auto" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg flex-1 sm:flex-none ${viewMode === 'list' ? 'bg-orange-100 text-orange-500' : 'text-gray-500'}`}
                                    >
                                        <IoList className="w-5 h-5 mx-auto" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <label className="text-sm text-gray-600 whitespace-nowrap">Ordenar por:</label>
                                    <select
                                        value={filters.sortBy}
                                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                        className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                                    >
                                        <option value="newest">Más recientes</option>
                                        <option value="price-asc">Precio: menor a mayor</option>
                                        <option value="price-desc">Precio: mayor a menor</option>
                                        <option value="rating">Mejor calificados</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {selectedProduct && (
  <div className="fixed inset-0 backdrop-blur-md bg-black/30 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full max-h-[85vh] flex flex-col">
      
      {/* Header */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          Detalles del producto
        </h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200 ease-in-out cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Imagen */}
          <div className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <Image
              src={selectedProduct.imagen_principal || '/placeholder.jpg'}
              alt={selectedProduct.nombre}
              fill
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          {/* Información estilo formulario */}
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                Nombre del producto
              </label>
              <p className="text-base font-medium text-gray-800">{selectedProduct.nombre}</p>
            </div>

            <div>
              <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                Marca
              </label>
              <p className="text-sm text-gray-700">
                {brands.find(brand => brand.id_marca === selectedProduct.id_marca)?.nombre || 'N/A'}
              </p>
            </div>

            <div>
              <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                Descripción
              </label>
              <p className="text-sm text-gray-600">{selectedProduct.descripcion}</p>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                  Precio
                </label>
                <p className="text-lg font-bold text-orange-600">
                  S/ {selectedProduct.precio.toFixed(2)}
                </p>
              </div>
            {/*Precio de oferta */}
              {selectedProduct.precio_oferta > 0 && (
                <div>
                  <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                    Precio oferta
                  </label>
                  <p className="text-lg  text-gray-500 line-through">
                    S/ {selectedProduct.precio_oferta.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                Stock disponible
              </label>
              <p className={`text-sm font-medium ${selectedProduct.stock > 0 ? 'text-gray-700' : 'text-red-500'}`}>
                {selectedProduct.stock > 0 ? selectedProduct.stock : 'Agotado'}
              </p>
            </div>

            {/* Botones */}
            <div className="pt-2 space-y-3">
              {selectedProduct.agregable_carrito === 1 && selectedProduct.stock > 0 && (
                <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 transition-colors duration-200 ease-in-out flex items-center justify-center gap-2 text-sm font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 2h16l-3 9H5.83l-.27-1H5l-1.99 1L4 2zm1 13a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                  Agregar al carrito
                </button>
              )}
              {selectedProduct.cotizable === 1 && (
                <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-colors duration-200 ease-in-out text-sm font-medium">
                  Solicitar cotización
                </button>
              )}
              {(selectedProduct.agregable_carrito === 0 || selectedProduct.stock === 0) && selectedProduct.cotizable !== 1 && (
                <div className="w-full bg-gray-100 text-gray-500 py-3 px-4 rounded-md text-sm font-medium text-center">
                  {selectedProduct.stock === 0 ? 'Producto agotado' : 'No disponible para agregar al carrito'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

                        {/* Grid de productos */}
                        <div className={
                            viewMode === 'grid' 
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' 
                                : 'space-y-4 sm:space-y-6'
                        }>
                            {sortedProducts.map((product) => (
                                <motion.div
                                    key={product.id_producto}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => handleProductClick(product)}
                                    className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                                        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                                    }`}
                                >
                                    <div className={`relative ${
                                        viewMode === 'list' 
                                            ? 'w-full sm:w-48 h-48' 
                                            : 'w-full h-48'
                                    }`}>
                                        <Image
                                            src={product.imagen_principal || '/placeholder.jpg'}
                                            alt={product.nombre}
                                            fill
                                            className="object-cover"
                                        />
                                        {product.precio_oferta > 0 && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                Oferta
                                            </div>
                                        )}
                                    </div>
                                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{product.nombre}</h3>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                                <span className="text-base sm:text-lg font-bold text-gray-900">
                                                    S/ {product.precio.toFixed(2)}
                                                </span>
                                                {product.precio_oferta > 0 && (
                                                    <span className="text-xs sm:text-sm text-gray-500 line-through sm:ml-2">
                                                        S/ {product.precio_oferta.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            {product.agregable_carrito === 1 && (
                                                <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors">
                                                    <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Paginación */}
                        <div className="mt-8 flex justify-center">
                            <nav className="flex flex-wrap items-center justify-center gap-2">
                                <button key="prev" className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                                    Anterior
                                </button>
                                <button key="page1" className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm">
                                    1
                                </button>
                                <button key="page2" className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                                    2
                                </button>
                                <button key="page3" className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                                    3
                                </button>
                                <button key="next" className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                                    Siguiente
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
