'use client';

import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaHistory, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const ProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/auth/logout', {
                method: 'POST',
            });

            if (response.ok) {
                localStorage.removeItem('user');
                setUser(null);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            
            <main className="flex-1 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Profile header with logout button */}
                    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-inner">
                                    <FaUser className="text-orange-400 text-5xl" />
                                </div>
                                <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-all transform group-hover:scale-110 shadow-md">
                                    <FaEdit className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-800">Nombre del Usuario</h1>
                                        <p className="text-gray-500 mt-1">Miembro desde Enero 2023</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="cursor-pointer mt-4 md:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
                                    >
                                        <FaSignOutAlt className="w-4 h-4" />
                                        <span>Cerrar Sesión</span>
                                    </button>
                                </div>
                                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-4">
                                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                                        5 Pedidos
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        Cliente frecuente
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rest of the profile sections remain the same */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal info */}
                        <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <FaUser className="text-orange-500" />
                                    Información Personal
                                </h2>
                                <button className="text-orange-500 hover:text-orange-600 p-1 rounded-full hover:bg-orange-50">
                                    <FaEdit className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-orange-50 rounded-full">
                                        <FaUser className="text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Nombre completo</p>
                                        <p className="font-medium text-gray-800">Juan Pérez</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-orange-50 rounded-full">
                                        <FaEnvelope className="text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Correo electrónico</p>
                                        <p className="font-medium text-gray-800">juan.perez@example.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-orange-50 rounded-full">
                                        <FaPhone className="text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Teléfono</p>
                                        <p className="font-medium text-gray-800">+51 987 654 321</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-orange-500" />
                                    Dirección Principal
                                </h2>
                                <button className="text-orange-500 hover:text-orange-600 p-1 rounded-full hover:bg-orange-50">
                                    <FaEdit className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="p-2 bg-orange-50 rounded-full mt-1">
                                    <FaMapMarkerAlt className="text-orange-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Casa Principal</p>
                                    <p className="text-gray-600 mt-1">Av. Javier Prado 1234, Lima 15021</p>
                                    <p className="text-gray-500 text-sm mt-1">Referencia: Frente al parque</p>
                                    <button className="mt-3 text-orange-500 text-sm font-medium hover:text-orange-600">
                                        + Agregar otra dirección
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Orders */}
                        <div className="bg-white shadow-lg rounded-xl p-6 md:col-span-2 transition-all hover:shadow-xl">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <FaHistory className="text-orange-500" />
                                    Historial de Pedidos
                                </h2>
                                <button className="text-orange-500 hover:text-orange-600 p-1 rounded-full hover:bg-orange-50">
                                    <FaBoxOpen className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="border rounded-lg divide-y overflow-hidden">
                                {[1, 2, 3].map(order => (
                                    <div key={order} className="p-4 hover:bg-gray-50 transition-colors group">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="hidden sm:block p-2 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors">
                                                    <FaBoxOpen className="text-orange-500 text-sm" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">Pedido #ORD-202300{order}</p>
                                                    <p className="text-sm text-gray-500">Realizado el 15/0{order}/2023</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:items-end">
                                                <p className="font-medium text-gray-800">S/ {150 + (order * 50)}.00</p>
                                                <p className={`text-sm font-medium ${order === 1 ? 'text-green-500' : order === 2 ? 'text-yellow-500' : 'text-red-500'}`}>
                                                    {order === 1 ? 'Entregado' : order === 2 ? 'En camino' : 'Cancelado'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-colors">
                                Ver todos los pedidos
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;