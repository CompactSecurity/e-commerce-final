'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface CartItem {
    id: number;
    name: string;
    price: number;
    salePrice?: number;
    quantity: number;
    stock: number;
    image: string;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const updateQuantity = (itemId: number, newQuantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === itemId) {
                    if (newQuantity > item.stock) {
                        toast.error(`Solo hay ${item.stock} unidades disponibles`);
                        return item;
                    }
                    if (newQuantity < 1) {
                        return item;
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const removeItem = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        toast.success('Producto eliminado del carrito');
    };

    const calculateSubtotal = (item: CartItem) => {
        const price = item.salePrice || item.price;
        return price * item.quantity;
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg shadow-sm">
                        <div className="relative w-full sm:w-32 h-32">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Link href={`/producto/${item.id}`} className="text-lg font-semibold text-gray-800 hover:text-orange-500">
                                {item.name}
                            </Link>
                            <div className="flex items-center gap-2">
                                {item.salePrice ? (
                                    <>
                                        <span className="text-xl font-bold text-orange-500">S/ {item.salePrice.toFixed(2)}</span>
                                        <span className="text-sm text-gray-500 line-through">S/ {item.price.toFixed(2)}</span>
                                    </>
                                ) : (
                                    <span className="text-xl font-bold text-gray-800">S/ {item.price.toFixed(2)}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded-lg">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-2 text-gray-600 hover:text-orange-500"
                                    >
                                        <FaMinus size={14} />
                                    </button>
                                    <span className="w-12 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-2 text-gray-600 hover:text-orange-500"
                                    >
                                        <FaPlus size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <FaTrash size={16} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">Subtotal: S/ {calculateSubtotal(item).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen de la compra</h2>
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Productos ({cartItems.length})</span>
                            <span>S/ {calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-3">
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span className="text-orange-500">S/ {calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                        onClick={() => {/* Implementar checkout */}}
                    >
                        Proceder al pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;