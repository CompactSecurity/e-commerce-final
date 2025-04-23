'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaStar, FaShoppingCart, FaFilter, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { IoGrid, IoList } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';

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

// Interfaz para ShopPage 
interface FilterOptions {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
    ratings: number[];
    sortBy: string;
}

const ShopPage = () => {
    //Para la seleccion de productos
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 9;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes, brandsRes] = await Promise.all([
                    fetch(`http://localhost/e-commerce/api/productos/get-paginated?page=${currentPage}&limit=${productsPerPage}`),
                    fetch('http://localhost/e-commerce/api/category/getAll'),
                    fetch('http://localhost/e-commerce/api/marca/getAll')
                ]);

                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();
                const brandsData = await brandsRes.json();

                // Updated data handling
                setProducts(Array.isArray(productsData.data?.data) ? 
                    productsData.data.data.map(product => ({
                        ...product,
                        precio: Number(product.precio),
                        precio_oferta: Number(product.precio_oferta || 0)
                    })) : 
                []);
                setTotalPages(productsData.data?.totalPages || 1);
                setCategories(Array.isArray(categoriesData.data) ? categoriesData.data : []);
                setBrands(Array.isArray(brandsData.data) ? brandsData.data.filter(brand => brand.id_marca || brand.id) : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setProducts([]);
                setCategories([]);
                setBrands([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]); // Agregar currentPage como dependencia

    // Agregar esta función para manejar el cambio de filtros
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
                return b.id_producto - a.id_producto; 
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
                        className="fixed inset-0 backdrop-blur-md bg-black/30 bg-opacity-50 z-40 lg:hidden"
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
                                        {brands.map((brand, index) => (
                                            <label 
                                                key={`brand-${brand.id_marca || brand.id || `index-${index}`}`} 
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={filters.brands.includes(String(brand.id_marca || brand.id))}
                                                    onChange={(e) => {
                                                        const brandId = String(brand.id_marca || brand.id);
                                                        const newBrands = e.target.checked
                                                            ? [...filters.brands, brandId]
                                                            : filters.brands.filter(b => b !== brandId);
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
                                            <label key={`category-${category.id_categoria}`} className="flex items-center">
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
                                    {/*<button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg flex-1 sm:flex-none ${viewMode === 'list' ? 'bg-orange-100 text-orange-500' : 'text-gray-500'}`}
                                    >
                                        <IoList className="w-5 h-5 mx-auto" />
                                    </button> */}
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
                                                        {brands.find(brand => brand.id_marca === selectedProduct.id_marca)?.nombre || 
                                                         brands.find(brand => brand.id === selectedProduct.id_marca)?.nombre || 
                                                         'Sin marca especificada'}
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
                                                            Precio de Oferta
                                                        </label>
                                                        <p className="text-lg font-bold text-orange-600">
                                                            S/ {selectedProduct.precio.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    {/*Precio de oferta */}
                                                    {selectedProduct.precio_oferta > 0 && (
                                                        <div>
                                                            <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                                                                Precio Normal
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
                                                        {selectedProduct.cotizable == 0? selectedProduct.cotizable : ' (Cotizable)'}
                                                    </p>
                                                </div>

                                                {/* Botones */}
                                                <div className="pt-2 space-y-3">
                                                    {Number(selectedProduct.cotizable) === 1 ? (
                                                        <button 
                                                            onClick={() => {
                                                                // Lógica para cotización
                                                                window.open(`https://wa.me/51976687566?text=Estoy interesado en cotizar el producto: ${selectedProduct.nombre}`);
                                                            }}
                                                            className="cursor-pointer w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition-colors duration-200 ease-in-out flex items-center justify-center gap-2 text-sm font-medium"
                                                        >
                                                            <FaWhatsapp className="w-5 h-5" />
                                                            Cotizar por WhatsApp
                                                        </button>
                                                    ) : Number(selectedProduct.agregable_carrito) === 1 && selectedProduct.stock > 0 ? (
                                                        <button 
                                                            onClick={() => {
                                                                // Lógica para agregar al carrito
                                                            }}
                                                            className="cursor-pointer w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 transition-colors duration-200 ease-in-out flex items-center justify-center gap-2 text-sm font-medium"
                                                        >
                                                            <FaShoppingCart className="w-5 h-5" />
                                                            Agregar al carrito
                                                        </button>
                                                    ) : (
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
                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                            {sortedProducts.length > 0 ? (
                                sortedProducts.map((product) => (
                                    // Replace the motion.div wrapper with Link component
                                    <Link href={`/productos/${product.slug}`} passHref key={product.id_producto}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer flex flex-col ${viewMode === 'list' ? 'sm:flex-row' : ''}`}
                                        >
                                            <div className={`relative ${viewMode === 'list' ? 'w-full sm:w-48 h-48' : 'w-full h-60'}`}>
                                                <Image
                                                    src={product.imagen_principal || '/placeholder.jpg'}
                                                    alt={product.nombre}
                                                    fill
                                                    className="object-contain bg-white p-2"
                                                />
                                                {product.precio_oferta > 0 && (
                                                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-medium shadow">
                                                        Oferta
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className={`flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                                <div className="p-4 pb-2 flex flex-col gap-1">
                                                    <h3 className="text-gray-900 font-semibold text-sm sm:text-base">{product.nombre}</h3>
                                                    
                                                    {Number(product.precio) === 0 ? (
                                                        <span className="text-sm text-gray-600 italic">Este producto solo es cotizable</span>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-base font-bold text-gray-800">
                                                                S/ {Number(product.precio).toFixed(2)}
                                                            </span>
                                                            {product.precio_oferta > 0 && (
                                                                <span className="text-sm text-gray-500 line-through">
                                                                    S/ {Number(product.precio_oferta || 0).toFixed(2)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Botones */}
                                                <div className="px-4 pb-4 pt-2">
                                                    {Number(product.cotizable) === 1 ? (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleProductClick(product);
                                                            }}
                                                            className="cursor-pointer flex items-center justify-center gap-2 w-full bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600 transition"
                                                        >
                                                            <FaWhatsapp className="w-4 h-4" />
                                                            Cotizar por WhatsApp
                                                        </button>
                                                    ) : Number(product.agregable_carrito) === 1 ? (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Aca va la logica para añadir al carrito
                                                            }}
                                                            className="cursor-pointer flex items-center justify-center gap-2 w-full bg-orange-500 text-white text-sm px-4 py-2 rounded hover:bg-orange-600 transition"
                                                        >
                                                            <FaShoppingCart className="w-4 h-4" />
                                                            Añadir al carrito
                                                        </button>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10">
                                    <p className="text-gray-500">No se encontraron productos</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Paginación */}
                        <div className="mt-8 flex justify-center">
                            <nav className="flex flex-wrap items-center justify-center gap-2">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="cursor-pointer px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm disabled:opacity-50"
                                >
                                    Anterior
                                    </button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button 
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`cursor-pointer px-3 py-1 ${currentPage === page ? 'bg-orange-500 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg text-sm`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="cursor-pointer px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm disabled:opacity-50"
                                >
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
