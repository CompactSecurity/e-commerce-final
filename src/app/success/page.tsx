'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessPage = () => {
    const searchParams = useSearchParams();
    
    useEffect(() => {
        // Clear the cart after successful payment
        localStorage.removeItem('cart');
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        ¡Pago Exitoso!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Tu pedido ha sido procesado correctamente.
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="border-t border-b py-4">
                        <p className="text-sm text-gray-600">
                            ID de Pago: {searchParams.get('payment_id')}
                        </p>
                        <p className="text-sm text-gray-600">
                            Estado: {searchParams.get('status')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Link 
                            href="/tienda"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Seguir Comprando
                        </Link>
                        <Link 
                            href="/perfil"
                            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Ver Mis Pedidos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;