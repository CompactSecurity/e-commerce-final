'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaStar, FaShoppingCart, FaFilter } from 'react-icons/fa';
import { IoGrid, IoList } from 'react-icons/io5';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import casco from '../../assets/Categorias/facial.jpg';
import guantes from '../../assets/Categorias/cabeza.jpg';
import lentes from '../../assets/Categorias/manos.jpg';

// Tipos de datos
interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: StaticImageData;
    category: string;
    brand: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    discount?: number;
}

interface FilterOptions {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
    ratings: number[];
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

const brands = [
    '3M',
    'Truper',
    'Asaki',
    'Stanley',
    'Pretul',
    'Kamasa',
    'C&A',
    'SM',
    'XTREME'    
];

const categories = [
    'Protección para la Cabeza',
    'Protección Auditiva',
    'Protección Respiratoria',
    'Protección para Manos',
    'Protección para Pies',
    'Protección Facial',
    'Protección Visual',
    'Protección para Caídas',
    'Ropa Industrial',
    'Señalización y Seguridad Vial',
    'Otros'
];

// Datos de ejemplo
const sampleProducts: Product[] = [
    {
        id: 1,
        name: 'Casco de Seguridad Industrial',
        price: 89.90,
        originalPrice: 129.90,
        image: casco,
        category: 'Cascos de Seguridad',
        brand: '3M',
        rating: 4.5,
        reviews: 128,
        isNew: true,
        discount: 30
    },
    {
        id: 2,
        name: 'Guantes de Seguridad',
        price: 45.90,
        image: guantes,
        category: 'Guantes de Seguridad',
        brand: 'DELTA PLUS',
        rating: 4.2,
        reviews: 95
    },
    {
        id: 3,
        name: 'Lentes de Seguridad',
        price: 35.90,
        image: lentes,
        category: 'Lentes de Seguridad',
        brand: 'MSA',
        rating: 4.8,
        reviews: 64,
        isNew: true
    },
    {
        id: 4,
        name: 'Block Retráctil 20m',
        price: 2433.76,
        image: casco,
        category: 'Arnés y líneas de vida',
        brand: 'SAFEWAZE',
        rating: 4.9,
        reviews: 32,
        isNew: true
    },
    {
        id: 5,
        name: 'Arnés de Seguridad',
        price: 299.90,
        originalPrice: 399.90,
        image: guantes,
        category: 'Arnés y líneas de vida',
        brand: 'STEELPRO',
        rating: 4.7,
        reviews: 156,
        discount: 25
    }
];

const ShopPage = () => {
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

    const handleFilterChange = (filterType: keyof FilterOptions, value: any) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const filteredProducts = sampleProducts.filter(product => {
        const matchesCategory = filters.categories.length === 0 || 
            filters.categories.includes(product.category);
        const matchesBrand = filters.brands.length === 0 ||
            filters.brands.includes(product.brand);
        const matchesPrice = product.price >= filters.priceRange[0] && 
            product.price <= filters.priceRange[1];
        const matchesRating = filters.ratings.length === 0 || 
            filters.ratings.includes(Math.floor(product.rating));
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesSearch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (filters.sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            default:
                return 0;
        }
    });

    // Función para cerrar filtros en móvil
    const closeMobileFilters = () => {
        setShowMobileFilters(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header de la tienda */}
            <div className="bg-white shadow-sm mt-20">
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

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Overlay para móvil */}
                    {showMobileFilters && (
                        <div 
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                            onClick={closeMobileFilters}
                        />
                    )}

                    {/* Sidebar de filtros */}
                    <div
                        className={`
                            fixed inset-y-0 left-0 w-full max-w-xs bg-white z-50 transform transition-transform duration-300 ease-in-out
                            lg:relative lg:inset-auto lg:transform-none lg:w-64 lg:flex-shrink-0
                            ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                        `}
                    >
                        <div className="h-full overflow-y-auto lg:h-auto">
                            <div className="sticky top-[calc(5rem+1px)] pt-6">
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
                                                <label key={brand} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.brands.includes(brand)}
                                                        onChange={(e) => {
                                                            const newBrands = e.target.checked
                                                                ? [...filters.brands, brand]
                                                                : filters.brands.filter(b => b !== brand);
                                                            handleFilterChange('brands', newBrands);
                                                        }}
                                                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{brand}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Categorías */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Categorías</h3>
                                        <div className="space-y-2 max-h-48 overflow-auto pr-2">
                                            {categories.map((category) => (
                                                <label key={category} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.categories.includes(category)}
                                                        onChange={(e) => {
                                                            const newCategories = e.target.checked
                                                                ? [...filters.categories, category]
                                                                : filters.categories.filter(c => c !== category);
                                                            handleFilterChange('categories', newCategories);
                                                        }}
                                                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{category}</span>
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

                                    {/* Calificación */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Calificación</h3>
                                        <div className="space-y-2">
                                            {[5, 4, 3, 2, 1].map((rating) => (
                                                <label key={rating} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.ratings.includes(rating)}
                                                        onChange={(e) => {
                                                            const newRatings = e.target.checked
                                                                ? [...filters.ratings, rating]
                                                                : filters.ratings.filter(r => r !== rating);
                                                            handleFilterChange('ratings', newRatings);
                                                        }}
                                                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                                    />
                                                    <div className="ml-2 flex items-center">
                                                        {[...Array(rating)].map((_, i) => (
                                                            <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                                                        ))}
                                                        {[...Array(5 - rating)].map((_, i) => (
                                                            <FaStar key={i} className="text-gray-300 w-4 h-4" />
                                                        ))}
                                                    </div>
                                                </label>
                                            ))}
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
                    </div>

                    {/* Contenido principal */}
                    <div className="flex-1">
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

                        {/* Grid de productos */}
                        <div className={
                            viewMode === 'grid' 
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' 
                                : 'space-y-4 sm:space-y-6'
                        }>
                            {sortedProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                                        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                                    }`}
                                >
                                    <div className={`relative ${
                                        viewMode === 'list' 
                                            ? 'w-full sm:w-48 h-48' 
                                            : 'w-full h-48'
                                    }`}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                        {product.isNew && (
                                            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                Nuevo
                                            </div>
                                        )}
                                        {product.discount && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                -{product.discount}%
                                            </div>
                                        )}
                                    </div>
                                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{product.name}</h3>
                                        <div className="mt-2 flex items-center">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                                            i < Math.floor(product.rating)
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-xs sm:text-sm text-gray-500">
                                                ({product.reviews})
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                                <span className="text-base sm:text-lg font-bold text-gray-900">
                                                    S/ {product.price.toFixed(2)}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-xs sm:text-sm text-gray-500 line-through sm:ml-2">
                                                        S/ {product.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors">
                                                <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Paginación */}
                        <div className="mt-8 flex justify-center">
                            <nav className="flex flex-wrap items-center justify-center gap-2">
                                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                                    Anterior
                                </button>
                                <button className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm">
                                    1
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                                    2
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                                    3
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
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