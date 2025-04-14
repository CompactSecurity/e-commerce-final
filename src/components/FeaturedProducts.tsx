'use client';
//Componente de los productos destacados
import React, { useState } from 'react';
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
    id: number;
    slug: string;
    name: string;
    image: string | StaticImageData;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    discount: number;
    category: string;
    badges?: string[];
}

const products: Product[] = [
    {
        id: 1,
        slug: 'casco-seguridad-msa-v-gard',
        name: 'Casco de Seguridad Industrial MSA V-GARD',
        image: logo2,
        price: 89.90,
        originalPrice: 129.90,
        rating: 4.5,
        reviews: 522,
        discount: 30,
        category: 'Protección para la Cabeza',
        badges: ['Certificado', 'Más Vendido']
    },
    {
        id: 2,
        slug: 'guantes-seguridad-anti-corte',
        name: 'Guantes de Seguridad Anti-corte',
        image: logo2,
        price: 45.90,
        originalPrice: 59.90,
        rating: 4.2,
        reviews: 345,
        discount: 23,
        category: 'Protección para las Manos',
        badges: ['Nuevo']
    },
    {
        id: 3,
        slug: 'botas-seguridad-punta-acero',
        name: 'Botas de Seguridad Punta de Acero',
        image: logo2,
        price: 199.90,
        originalPrice: 249.90,
        rating: 4.8,
        reviews: 892,
        discount: 20,
        category: 'Calzado de Seguridad',
        badges: ['Premium']
    },
    {
        id: 4,
        slug: 'mascarilla-respirador-3m-n95',
        name: 'Mascarilla Respirador 3M N95',
        image: logo2,
        price: 15.90,
        originalPrice: 19.90,
        rating: 4.3,
        reviews: 234,
        discount: 20,
        category: 'Protección Respiratoria'
    }
];

const ProductCard = ({ product }: { product: Product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const [isWishlist, setIsWishlist] = useState(false);

    const handleViewDetails = () => {
        router.push(`/productos/${product.slug}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('Agregado al carrito:', product.name);
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
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority
                    />
                </motion.div>

                {/* Descuento */}
                {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        -{product.discount}%
                    </div>
                )}

                {/* Badges */}
                {product.badges && (
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {product.badges.map((badge, index) => (
                            <div
                                key={index}
                                className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                            >
                                {badge}
                            </div>
                        ))}
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
                    <div className="text-xs md:text-sm font-medium text-gray-500 mb-1 md:mb-2">{product.category}</div>

                    {/* Nombre del producto */}
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-4 line-clamp-2">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    className={`w-3 h-3 md:w-4 md:h-4 ${
                                        i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs md:text-sm text-gray-500">({product.reviews})</span>
                    </div>

                    {/* Precio */}
                    <div className="flex items-center gap-1 md:gap-2 mb-4">
                        <span className="text-xl md:text-2xl font-bold text-gray-900">
                            S/ {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="text-xs md:text-sm text-gray-500 line-through">
                                S/ {product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Botón de acción - Siempre visible en la parte inferior */}
                <div className="mt-auto pt-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl
                                font-medium flex items-center justify-center gap-1 md:gap-2 shadow-lg shadow-orange-500/20 cursor-pointer text-sm md:text-base"
                    >
                        <FiShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                        <span>
                            <a href="/tienda">
                            Agregar al Carrito
                            </a>
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const FeaturedProducts = () => {
    const [activeTab, setActiveTab] = useState<'recommended' | 'selling' | 'latest'>('recommended');

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
                            Descubre nuestra selección de productos de alta calidad
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                        {[
                            { id: 'recommended', label: 'Recomendados' },
                            { id: 'selling', label: 'Más Vendidos' },
                            { id: 'latest', label: 'Últimos' }
                        ].map((tab) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {tab.label}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Características */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        {
                            icon: <FiTruck className="w-6 h-6" />,
                            title: 'Envío Gratis',
                            description: 'En pedidos mayores a S/ 299'
                        },
                        {
                            icon: <FiShield className="w-6 h-6" />,
                            title: 'Garantía de Calidad',
                            description: 'Productos certificados'
                        },
                        {
                            icon: <FiAward className="w-6 h-6" />,
                            title: 'Soporte Premium',
                            description: 'Atención personalizada'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-6 rounded-2xl bg-white shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grid de productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                    <AnimatePresence>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl
                                font-medium flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer mt-10"
                >
                    <span>
                        <a href="/tienda">
                        Ver Todos los Productos
                        </a>
                    </span>
                </motion.button>
            </div>
        </section>
    );
};

export default FeaturedProducts;