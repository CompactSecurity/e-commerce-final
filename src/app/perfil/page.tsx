'use client';

import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaHistory, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import perfil from '@/assets/perfil/perfil.jpg'
import Image from 'next/image';

interface User {
  id_usuario: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  rol: string;
  fecha_registro: string;
}

interface Order {
  id_pedido: number;
  fecha_pedido: string;
  total: number;
  estado_pedido: string;
}

interface Address {
  id_direccion: number;
  direccion: string;
  referencia: string;
  principal: boolean;
}

const ProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Check if we have a user in localStorage first
                const storedUser = localStorage.getItem('user');
                
                const response = await fetch('http://localhost/e-commerce/api/profile/get', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });


                
                if (response.status === 401) {
                    console.log('Unauthorized: Session may have expired');
                    
                    // If we have a stored user, try to use that data temporarily
                    if (storedUser) {
                        const userData = JSON.parse(storedUser);
                        setUser(userData);
                        setLoading(false);
                        return;
                    }
                    
                    // Otherwise redirect to login
                    router.push('/');
                    return;
                }

                const data = await response.json();

                
                if (data.success) {
                    setUser(data.data.profile);
                    setOrders(data.data.orders || []);
                    setAddresses(data.data.addresses || []);
                    // Update localStorage with latest user data
                    localStorage.setItem('user', JSON.stringify(data.data.profile));
                } else {
                    throw new Error(data.message || 'Error al cargar el perfil');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                
                // Try to use localStorage data as fallback
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    router.push('/');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [router]);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost/e-commerce/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                localStorage.removeItem('user');
                setUser(null);
                router.push('/');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <FaUser className="text-orange-500 text-5xl mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No has iniciado sesión</h2>
                    <p className="text-gray-600 mb-4">Debes iniciar sesión para ver tu perfil</p>
                    <button 
                        onClick={() => router.push('/')}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            
            <main className="flex-1 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Profile header with logout button */}
                    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-inner overflow-hidden">
                                    <Image 
                                        src={perfil} 
                                        alt="Perfil de usuario"
                                        width={128}
                                        height={128}
                                        className="object-cover"
                                        onError={(e) => {
                                            // Fallback to icon if image fails to load
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const parent = target.parentElement;
                                            if (parent) {
                                                const icon = document.createElement('div');
                                                icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#f97316" width="48" height="48"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>';
                                                parent.appendChild(icon);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-800">
                                            {user.nombre} {user.apellidos}
                                        </h1>
                                        <p className="text-gray-500 mt-1">
                                            Miembro desde {user.fecha_registro ? formatDate(user.fecha_registro) : '(No disponible)'}
                                        </p>
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
                                        {orders.length} Pedido{orders.length !== 1 ? 's' : ''}
                                    </span>
                                    {orders.length > 3 && (
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                            Cliente frecuente
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

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
                                        <p className="font-medium text-gray-800">{user.nombre} {user.apellidos}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-orange-50 rounded-full">
                                        <FaEnvelope className="text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Correo electrónico</p>
                                        <p className="font-medium text-gray-800">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-orange-50 rounded-full">
                                        <FaPhone className="text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Teléfono</p>
                                        <p className="font-medium text-gray-800">{user.telefono || 'No disponible'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-orange-500" />
                                    Dirección
                                </h2>
                                <button className="text-orange-500 hover:text-orange-600 p-1 rounded-full hover:bg-orange-50">
                                    <FaEdit className="w-5 h-5" />
                                </button>
                            </div>
                            {addresses.length > 0 ? (
                                <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-orange-50 rounded-full mt-1">
                                        <FaMapMarkerAlt className="text-orange-500" />
                                    </div>
                                    <div>
                                        {addresses.map((address, index) => (
                                            <div key={address.id_direccion} className={index > 0 ? "mt-4 pt-4 border-t border-gray-100" : ""}>
                                                <p className="font-medium text-gray-800">
                                                    {address.principal ? 'Dirección Principal' : `Dirección ${index + 1}`}
                                                </p>
                                                <p className="text-gray-600 mt-1">{address.direccion}</p>
                                                {address.referencia && (
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        Referencia: {address.referencia}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                        <button className="mt-3 text-orange-500 text-sm font-medium hover:text-orange-600">
                                            + Agregar otra dirección
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-4 text-gray-500">
                                    No hay direcciones registradas
                                </div>
                            )}
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
                            {orders.length > 0 ? (
                                <>
                                    <div className="border rounded-lg divide-y overflow-hidden">
                                        {orders.map(order => (
                                            <div key={order.id_pedido} className="p-4 hover:bg-gray-50 transition-colors group">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="hidden sm:block p-2 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors">
                                                            <FaBoxOpen className="text-orange-500 text-sm" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">Pedido #{order.id_pedido}</p>
                                                            <p className="text-sm text-gray-500">
                                                                Realizado el {formatDate(order.fecha_pedido)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:items-end">
                                                        <p className="font-medium text-gray-800">S/ {order.total.toFixed(2)}</p>
                                                        <p className={`text-sm font-medium ${
                                                            order.estado_pedido === 'entregado' ? 'text-green-500' : 
                                                            order.estado_pedido === 'enviado' ? 'text-blue-500' : 
                                                            order.estado_pedido === 'procesando' ? 'text-yellow-500' : 
                                                            order.estado_pedido === 'cancelado' ? 'text-red-500' : 
                                                            'text-gray-500'
                                                        }`}>
                                                            {order.estado_pedido}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <FaBoxOpen className="text-gray-300 text-5xl mx-auto mb-4" />
                                    <p className="text-gray-500">No tienes pedidos realizados</p>
                                    <button 
                                        onClick={() => router.push('/tienda')}
                                        className="cursor-pointer mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        Ir a la tienda
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;