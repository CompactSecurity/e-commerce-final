'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
    FiStar, 
    FiShoppingCart, 
    FiHeart,
    FiEye,
    FiTruck,
    FiShield,
    FiAward
} from 'react-icons/fi';
import { DM_Sans } from 'next/font/google';
import { StaticImageData } from 'next/image';
import logo2 from '../assets/logo2.jpg';

const DMSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
});

interface Product {
    id_producto: number;
    slug: string;
    nombre: string;
    imagen_principal: string | StaticImageData;
    precio: number;
    precio_oferta: number;
    stock: number;
    id_categoria: number;
    categoria: string;
    cotizable: number;
    agregable_carrito: number;
    destacado: number;
    descripcion: string;
}

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                console.log("Fetching featured products...");
                const response = await fetch('http://localhost/e-commerce/api/productos/get-destacados');
                
                console.log("Response status:", response.status);
                const responseText = await response.text();
                console.log("Raw response:", responseText);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = JSON.parse(responseText);
                console.log("Parsed JSON data:", data);
                
                if (data.status === 'success') {
                    console.log("Featured products data:", data.data);
                    setFeaturedProducts(data.data);
                } else {
                    console.error('API Error:', data.mensaje || 'Unknown error');
                }
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    const ProductCard = ({ product }: { product: Product }) => {
        const [isHovered, setIsHovered] = useState(false);
        const router = useRouter();
        const [isWishlist, setIsWishlist] = useState(false);

        const handleViewDetails = () => {
            router.push(`/productos/${product.slug}`);
        };

        const handleAddToCart = (e: React.MouseEvent) => {
            e.stopPropagation();
            console.log('Agregado al carrito:', product.nombre);
        };

        const handleToggleWishlist = (e: React.MouseEvent) => {
            e.stopPropagation();
            setIsWishlist(!isWishlist);
        };

        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-auto min-h-[400px] md:min-h-[500px]"
                onClick={handleViewDetails}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Imagen y Badges */}
                <div className="relative aspect-square bg-gray-50 p-4 md:p-6">
                    <motion.div
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={product.imagen_principal || logo2}
                            alt={product.nombre}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            priority
                        />
                    </motion.div>

                    {/* Descuento */}
                    {product.precio_oferta > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            -{Math.round((1 - product.precio / product.precio_oferta) * 100)}%
                        </div>
                    )}

                    {/* Acciones rápidas */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute bottom-4 right-4 flex gap-2"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleToggleWishlist}
                            className={`p-2 rounded-full ${
                                isWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                            } shadow-md hover:shadow-lg transition-all duration-300`}
                        >
                            <FiHeart className={`w-5 h-5 ${isWishlist ? 'fill-current' : ''}`} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleViewDetails}
                            className="p-2 rounded-full bg-white text-gray-600 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <FiEye className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Contenido */}
                <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                        {/* Categoría */}
                        <div className="text-xs md:text-sm font-medium text-gray-500 mb-1 md:mb-2">
                            {product.categoria}
                        </div>

                        {/* Nombre del producto */}
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-4 line-clamp-2">
                            {product.nombre}
                        </h3>

                        {/* Precio */}
                        <div className="flex items-center gap-1 md:gap-2 mb-4">
                            <span className="text-xl md:text-2xl font-bold text-gray-900">
                                S/ {product.precio.toFixed(2)}
                            </span>
                            {product.precio_oferta > product.precio && (
                                <span className="text-xs md:text-sm text-gray-500 line-through">
                                    S/ {product.precio_oferta.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Botón de acción */}
                    <div className="mt-auto pt-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddToCart}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl
                                    font-medium flex items-center justify-center gap-1 md:gap-2 shadow-lg shadow-orange-500/20 cursor-pointer text-sm md:text-base"
                        >
                            <FiShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                            <span>Agregar al Carrito</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section className={`py-16 bg-gradient-to-b from-white to-gray-50 ${DMSans.className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Encabezado */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Productos Destacados
                        </h2>
                        <p className="text-gray-600">
                            Nuestra selección especial de productos destacados
                        </p>
                    </div>
                </div>

                {/* Características */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* ... (keep your existing features section) ... */}
                </div>

                {/* Grid de productos destacados */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatePresence>
                                {featuredProducts.map((product) => (
                                    <ProductCard key={product.id_producto} product={product} />
                                ))}
                            </AnimatePresence>
                        </div>
                        {featuredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No hay productos destacados disponibles</p>
                            </div>
                        )}
                    </>
                )}

                <div className="flex justify-center w-full mt-10">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl
                                font-medium flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
                    >
                        <span>
                            <a href="/tienda">Ver Todos los Productos</a>
                        </span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;