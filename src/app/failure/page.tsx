'use client'
import React from 'react';
import Link from 'next/link';
import { FaTimesCircle } from 'react-icons/fa';

const FailurePage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <FaTimesCircle className="mx-auto h-16 w-16 text-red-500" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Error en el Pago
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Hubo un problema al procesar tu pago.
                    </p>
                </div>

                <div className="mt-8">
                    <Link 
                        href="/cart"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Volver al Carrito
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FailurePage;