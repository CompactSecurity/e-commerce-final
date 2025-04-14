'use client'
import React, { useState } from 'react';
import { FaShoppingCart, FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const Cart = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleAddToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const handleRemoveFromCart = (itemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <>
            {/* Cart Icon */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-white hover:text-orange-500 transition-colors"
            >
                <FaShoppingCart className="text-xl" />
                {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                    </span>
                )}
            </button>

            {/* Cart Panel */}
            <div
                className={`fixed top-0 right-0 w-full md:w-96 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                    isCartOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Carrito de Compras</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Tu carrito está vacío</p>
                                <Link
                                    href="/tienda"
                                    className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    Ir a la tienda
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 p-4 border rounded-lg"
                                    >
                                        <div className="relative w-20 h-20">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-orange-500 font-bold">S/ {item.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="text-gray-500 hover:text-orange-500"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="text-gray-500 hover:text-orange-500"
                                                >
                                                    <FaPlus />
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                    className="ml-auto text-red-500 hover:text-red-600"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="text-orange-500 font-bold text-xl">
                                    S/ {calculateTotal().toFixed(2)}
                                </span>
                            </div>
                            <Link
                                href="/checkout"
                                className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Proceder al pago
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart; 