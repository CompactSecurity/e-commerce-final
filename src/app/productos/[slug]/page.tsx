'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa'; // Import icons
// Assuming Navbar and Footer are in these locations
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Replace the lucide-react Link import with Next.js Link
import Link from 'next/link';

// Update the ProductDetail interface
interface ProductDetail {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precio_oferta: number;
    imagen_principal: string;
    stock: number;
    cotizable: number;
    agregable_carrito: number;
    estado: number;
    id_categoria: number;
    id_marca: number;
    categoria_nombre: string; // Add this
    marca_nombre: string;     // Add this
}

// Add this interface near the top with other interfaces
interface RelatedProduct {
    id_producto: number;
    nombre: string;
    precio: number;
    precio_oferta: number;
    imagen_principal: string;
    slug: string;
    stock: number;
    estado: number;
}

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Inside the ProductPage component, add this state
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);

    // Modify the useEffect to fetch related products
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch product details
                const response = await fetch(`http://localhost/e-commerce/api/productos/get-by-slug/${slug}`);
                if (!response.ok) {
                    let errorMessage = 'Producto no encontrado';
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.mensaje || errorMessage;
                    } catch (e) {
                        errorMessage = response.statusText || errorMessage;
                    }
                    throw new Error(errorMessage);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Respuesta del servidor no es JSON');
                }
                const data = await response.json();
                if (data.status === 'success' && data.data) {
                    setProduct(data.data);
                    
                    // Fetch related products
                    const relatedResponse = await fetch(
                        `http://localhost/e-commerce/api/productos/related/${data.data.id_categoria}/${data.data.id_producto}`
                    );
                    const relatedData = await relatedResponse.json();
                    if (relatedData.status === 'success') {
                        setRelatedProducts(relatedData.data || []);
                    }
                } else {
                    throw new Error(data.mensaje || 'Error al cargar el producto');
                }
            } catch (error: any) {
                console.error('Error:', error);
                setError(error.message || 'Error al cargar el producto');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchData();
        }
    }, [slug]);

    // --- Renderizado ---

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center pt-[70px] bg-gray-100">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <p className="text-lg text-gray-700 animate-pulse">Cargando detalles del producto...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center pt-[70px] bg-gray-100">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <p className="text-red-600 text-center px-4 text-lg font-semibold">Error: {error}</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center pt-[70px] bg-gray-100">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <p className="text-gray-600 text-lg">Producto no encontrado.</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-[70px]">
                {/* Breadcrumb */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <nav className="text-sm">
                            <ol className="flex items-center space-x-2">
                                <li><Link href="/" className="text-gray-500 hover:text-gray-700">Inicio</Link></li>
                                <li><span className="text-gray-400">/</span></li>
                                <li><Link href="/tienda" className="text-gray-500 hover:text-gray-700">Productos</Link></li>
                                <li><span className="text-gray-400">/</span></li>
                                <li className="text-gray-900 font-medium truncate">{product.nombre}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                            {/* Left Column - Image */}
                            <div className="flex justify-center items-center">
                                <div className="relative w-full max-w-[500px] aspect-square rounded-xl bg-white overflow-hidden group">
                                    {product.imagen_principal && (
                                        <Image
                                            src={product.imagen_principal} // Remove the duplicate base URL
                                            alt={product.nombre}
                                            fill
                                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                            priority
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            onError={(e) => {
                                                console.error('Image failed to load:', product.imagen_principal);
                                                const imgElement = e.target as HTMLImageElement;
                                                imgElement.src = '/placeholder.jpg';
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            
                                {/* Right Column - Updated Product Details */}
                                <div className="flex flex-col justify-between">
                                    {/* Category and Brand */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-sm text-gray-500">
                                            Categoría: <span className="text-blue-600">{product.categoria_nombre}</span>
                                        </span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-sm text-gray-500">
                                            Marca: <span className="text-blue-600">{product.marca_nombre}</span>
                                        </span>
                                    </div>

                                {/* Product Status y ID */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        Number(product.estado) === 1 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {Number(product.estado) === 1 ? 'Disponible' : 'No Disponible'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        SKU: {product.id_producto.toString().padStart(6, '0')}
                                    </span>
                                </div>


                                    {/* Product Title */}
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                        {product.nombre}
                                    </h1>

                                    {/* Price Section with better offer price display */}
                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                        <div className="flex flex-col">
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-4xl font-bold text-orange-600">
                                                    S/ {Number(product.precio).toFixed(2)}
                                                </span>
                                                {product.precio_oferta > 0 && (
                                                    <>
                                                        <span className="text-xl text-gray-500 line-through">
                                                            S/ {Number(product.precio_oferta).toFixed(2)}
                                                        </span>
                                                        {product.precio_oferta > 0 && product.precio_oferta < product.precio && (
                                                        <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                                                            {Math.round((product.precio - product.precio_oferta) / product.precio * 100)}% Descuento
                                                        </span>
                                                )}

                                                    </>
                                                )}
                                            </div>
                                            {product.precio_oferta > 0 && (
                                                <p className="text-sm text-green-600 mt-2">
                                                    ¡Ahorras S/ {(product.precio_oferta - product.precio).toFixed(2)}!
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Stock Info with more detail */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${
                                            Number(product.cotizable) === 1 
                                                ? 'bg-yellow-500' 
                                                : product.stock > 0 
                                                    ? 'bg-green-500' 
                                                    : 'bg-red-500'
                                        }`}></div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {Number(product.cotizable) === 1
                                                ? 'Stock cotizable'
                                                : product.stock > 0
                                                    ? `${product.stock} unidades disponibles`
                                                    : 'Sin stock disponible'}
                                        </span>
                                    </div>
                                </div>



                                    {/* Description with better formatting */}
                                    <div className="prose prose-sm text-gray-600 mb-8">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Descripción del producto</h2>
                                        <p className="whitespace-pre-line">{product.descripcion || "Sin descripción disponible."}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        {Number(product.cotizable) === 1 ? (
                                            <button
                                                onClick={() =>
                                                    window.open(`https://wa.me/+51976687566?text=Hola, estoy interesado en: ${product.nombre}`)
                                                }
                                                className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-green-200 transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                <FaWhatsapp className="w-5 h-5" />
                                                Cotizar por WhatsApp
                                            </button>
                                        ) : Number(product.agregable_carrito) === 1 && Number(product.estado) === 1 && Number(product.stock) > 0 ? (
                                            <>
                                                <button className="cursor-pointer w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-orange-200 transition-all duration-300 flex items-center justify-center gap-2">
                                                    <FaShoppingCart className="w-5 h-5" />
                                                    Comprar ahora
                                                </button>
                                                <button className="cursor-pointer w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                                                    Agregar al carrito
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full bg-gray-100 text-gray-500 py-4 rounded-lg text-center font-medium">
                                                {Number(product.stock) === 0 ? 'Producto agotado' : 'Producto no disponible'}
                                            </div>
                                        )}
                                    </div>


                                    {/* Additional Info */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Envíos rapidos</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Garantía de calidad</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {relatedProducts.length > 0 && (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
                <Link 
                    href={`/productos/${relatedProduct.slug}`} 
                    key={relatedProduct.id_producto}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="relative aspect-square">
                        <Image
                            src={relatedProduct.imagen_principal}
                            alt={relatedProduct.nombre}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {relatedProduct.nombre}
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-lg font-bold text-orange-600">
                                S/ {Number(relatedProduct.precio).toFixed(2)}
                            </span>
                            {relatedProduct.precio_oferta > 0 && (
                                <span className="text-sm text-gray-500 line-through">
                                    S/ {Number(relatedProduct.precio_oferta).toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
)}
            <Footer />
        </>
    );
}

