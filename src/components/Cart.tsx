'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlus, FaMinus, FaTrash, FaBoxOpen } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

interface CartItem {
    id_producto: number;
    nombre: string;
    precio: number;
    precio_oferta: number | null;
    cantidad: number;
    stock: number;
    imagen_principal: string;
    categoria: string; // Add category
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [preferenceId, setPreferenceId] = useState<string>('');

    // Initialize MercadoPago
    useEffect(() => {
        initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } else {
            localStorage.removeItem('cart');
        }
    }, [cartItems]);
    

    const updateQuantity = (itemId: number, newQuantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id_producto === itemId) {
                    if (newQuantity > item.stock) {
                        toast.error(`Solo hay ${item.stock} unidades disponibles`);
                        return item;
                    }
                    if (newQuantity < 1) {
                        return item;
                    }
                    return { ...item, cantidad: newQuantity };
                }
                return item;
            })
        );
    };

    const removeItem = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id_producto !== itemId));
        toast.success('Producto eliminado del carrito');
    };

    const calculateSubtotal = (item: CartItem) => {
        const price = item.precio || item.precio_oferta;
        return price * item.cantidad;
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
    };

    const createPreference = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/create-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartItems }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Error creating preference');
            }

            const data = await response.json();
            if (!data.preferenceId) {
                throw new Error('No preference ID received');
            }
            
            setPreferenceId(data.preferenceId);
        } catch (error) {
            console.error('Error creating preference:', error);
            toast.error('Error al procesar el pago. Por favor, intente nuevamente.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
                <FaBoxOpen size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-600 mb-8">¡Agrega algunos productos para comenzar!</p>
                <Link 
                    href="/tienda" 
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                    Ir a la tienda
                </Link>
            </div>
        );
    }

    return (
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 min-h-screen">
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-1">Carrito de Compras</h2> {/* mb-1 para menos margen */}
                    <p className="text-gray-600 text-sm">
                        Aquí puedes revisar los productos que has añadido a tu carrito.
                    </p>
                </div>
                {cartItems.map((item) => (
                    <div
                        key={item.id_producto}
                        className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-gray-200 rounded-xl shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
                    >
                        <div className="relative w-60 h-60 sm:w-40 sm:h-40 rounded-lg overflow-hidden">
                            <Image
                                src={item.imagen_principal}
                                alt={item.nombre}
                                fill
                                className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                                <Link
                                    href={`/producto/${item.id_producto}`}
                                    className="text-xl font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-200"
                                >
                                    {item.nombre}
                                </Link>
                                <div className="flex items-center gap-3">
                                    {item.precio_oferta ? (
                                        <>
                                            <span className="text-xl font-bold text-orange-600">
                                                S/ {item.precio.toFixed(2)}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                                S/ {item.precio_oferta.toFixed(2)}
                                            </span>
                                            <span className="bg-red-100 text-red-500 text-xs font-semibold py-1 px-2 rounded-full">
                                                Oferta
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-xl font-bold text-gray-900">
                                            S/ {item.precio.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 sm:mt-0">
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => updateQuantity(item.id_producto, item.cantidad - 1)}
                                        className="cursor-pointer p-2 text-gray-600 hover:text-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={item.cantidad <= 1}
                                    >
                                        <FaMinus size={16} />
                                    </button>
                                    <span className="w-12 text-center text-gray-700 font-medium">
                                        {item.cantidad}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id_producto, item.cantidad + 1)}
                                        className="cursor-pointer p-2 text-gray-600 hover:text-orange-500 focus:outline-none"
                                    >
                                        <FaPlus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id_producto)}
                                    className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-all duration-200"
                                >
                                    <FaTrash size={16} className="cursor-pointer" />
                                    <span className="cursor-pointer text-sm font-medium">Eliminar</span>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Subtotal: <span className="font-semibold">S/ {calculateSubtotal(item).toFixed(2)}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="lg:col-span-1 sm:pt-19">
                <div className="bg-white p-8 rounded-xl shadow-lg sticky top-28 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumen de la compra</h2>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-gray-700">
                            <span>Productos ({cartItems.length})</span>
                            <span className="font-medium">S/ {calculateTotal().toFixed(2)}</span>
                        </div>
                        
                        <div className="border-t pt-4">
                            <div className="flex justify-between font-semibold text-lg text-gray-900">
                                <span>Total</span>
                                <span className="text-orange-600">S/ {calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    {preferenceId ? (
                        <Wallet initialization={{ preferenceId }} />
                    ) : (
                        <button
                            onClick={createPreference}
                            className="cursor-pointer w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-full hover:scale-102 hover:shadow-md transition-all duration-200 font-semibold"
                        >
                            Proceder al pago
                        </button>
                    )}
                    {cartItems.length > 0 && (
                        <div className="mt-4 text-center text-sm text-gray-600">
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="text-green-600 font-medium">Compra 100% Segura</span>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Garantizamos la seguridad de tu pago y la protección de tus datos.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;