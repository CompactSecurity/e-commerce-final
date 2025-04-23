'use client';
import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa';
import { FiHeart, FiEye, FiShoppingCart as FiCart } from 'react-icons/fi';
import { DM_Sans } from 'next/font/google';
import logo2 from '../assets/logo2.jpg';

const DMSans = DM_Sans({ weight: ['400', '500', '700'], subsets: ['latin'] });

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('http://localhost/e-commerce/api/productos/get-destacados');
        const responseText = await response.text();
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = JSON.parse(responseText);
        if (data.status === 'success') {
          setFeaturedProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleProductClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
  };

  const closeModal = () => setSelectedProduct(null);

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

    const isCotizable = Number(product.cotizable) === 1;
    const isAgregable = Number(product.agregable_carrito) === 1;

    const renderActionButton = () => {
      if (isCotizable) {
        return (
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/51987654321?text=Hola,%20estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(product.nombre)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="w-5 h-5" />
            Cotizar
          </motion.a>
        );
      } else if (isAgregable) {
        return (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2"
          >
            <FiCart className="w-5 h-5" />
            Agregar al Carrito
          </motion.button>
        );
      }
      return (
        <button disabled className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-xl cursor-not-allowed">
          No disponible
        </button>
      );
    };

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer flex flex-col min-h-[400px]"
        onClick={(e) => handleProductClick(product, e)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square bg-gray-50 p-4">
          <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.3 }} className="relative w-full h-full">
            <Image
              src={product.imagen_principal || logo2}
              alt={product.nombre}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority
            />
          </motion.div>
          {product.precio_oferta > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              -{Math.round((1 - product.precio / product.precio_oferta) * 100)}%
            </div>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-4 right-4 flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full ${isWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} shadow`}
            >
              <FiHeart className={`w-5 h-5 ${isWishlist ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={closeModal}
              className="p-2 rounded-full bg-white text-gray-600 shadow cursor-pointer"
            >
              <FiEye className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">{product.categoria}</div>
            <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">{product.nombre}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-gray-900">S/ {product.precio.toFixed(2)}</span>
              {product.precio_oferta > product.precio && (
                <span className="text-sm text-gray-500 line-through">S/ {product.precio_oferta.toFixed(2)}</span>
              )}
            </div>  
          </div>
          <div className="mt-auto">{renderActionButton()}</div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className={`py-16 bg-gradient-to-b from-white to-gray-50 ${DMSans.className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Productos Destacados</h2>
          <p className="text-gray-600">Nuestra selección especial de productos destacados</p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
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
              <div className="text-center py-12 text-gray-500">No hay productos destacados disponibles</div>
            )}
          </>
        )}
        <div className="flex justify-center mt-10">
          <a
            href="/tienda"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg"
          >
            Ver Todos los Productos
          </a>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                  <Image
                    src={selectedProduct.imagen_principal || logo2}
                    alt={selectedProduct.nombre}
                    fill
                    className="object-contain bg-white p-2"
                  />
                </div>

                {/* Information */}
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                      Nombre del producto
                    </label>
                    <p className="text-base font-medium text-gray-800">{selectedProduct.nombre}</p>
                  </div>

                  <div>
                    <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                      Categoría
                    </label>
                    <p className="text-sm text-gray-700">{selectedProduct.categoria}</p>
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
                    {selectedProduct.precio_oferta > 0 && (
                      <div>
                        <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
                          Precio Normal
                        </label>
                        <p className="text-lg text-gray-500 line-through">
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
                      {selectedProduct.cotizable == 1 ? ' (Cotizable)' : ''}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-3">
                    {Number(selectedProduct.cotizable) === 1 ? (
                      <button 
                        onClick={() => {
                          window.open(`https://wa.me/51987654321?text=Estoy interesado en cotizar el producto: ${selectedProduct.nombre}`);
                        }}
                        className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition-colors duration-200 ease-in-out flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        Cotizar por WhatsApp
                      </button>
                    ) : Number(selectedProduct.agregable_carrito) === 1 && selectedProduct.stock > 0 ? (
                      <button 
                        onClick={() => console.log('Agregar al carrito:', selectedProduct.nombre)}
                        className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 transition-colors duration-200 ease-in-out flex items-center justify-center gap-2 text-sm font-medium"
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
    </section>
  );
};

export default FeaturedProducts;
