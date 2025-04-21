'use client'
//Componente de la Navbar
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.jpg';
import Image from 'next/image';
import { FaPhone, FaUser, FaEnvelope, FaInstagram, FaFacebook, FaYoutube, FaSearch, FaBars, FaTag, FaStar, FaStarHalfAlt, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import Cart from './Cart';

// Add this interface if not already present
interface User {
    id_usuario: number;  // Changed from id to id_usuario to match DB
    nombre: string;
    apellidos: string;
    email: string;
    rol: string;
}

const Navbar = () => {
    const [isOffersOpen, setIsOffersOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Add this useEffect to check for user data
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);



    const handleOpenRegister = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    const handleOpenLogin = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const handleOpenForgotPassword = () => {
        setIsLoginModalOpen(false);
        setIsForgotPasswordModalOpen(true);
    };

    const handleCloseForgotPassword = () => {
        setIsForgotPasswordModalOpen(false);
    };

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
        <>
            <header className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
                {/* Barra superior - Ocultar en móvil */}
                <div className="bg-[#255270] text-white py-2 hidden md:block">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                                <FaPhone className="text-orange-500 mr-2" />
                                <span>976 687 566</span>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-orange-500 mr-2" />
                                <span>compact.estudios@gmail.com</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>Síguenos en:</span>
                            <div className="flex space-x-3">
                                <Link href="https://www.instagram.com/compactepp/" target="_blank" className="hover:text-orange-500 transition-colors">
                                    <FaInstagram />
                                </Link>
                                <Link href="https://www.facebook.com/compactseguridad" target="_blank" className="hover:text-orange-500 transition-colors">
                                    <FaFacebook />
                                </Link>
                                <Link href="https://www.youtube.com/@Compactepp" target="_blank" className="hover:text-orange-500 transition-colors">
                                    <FaYoutube />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barra principal */}
                <div className={`bg-[#255270] transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16 md:h-20">
                            {/* Logo y menú hamburguesa */}
                            <div className="flex items-center">
                                <Link href="/" className="flex-shrink-0">
                                    <Image 
                                        src={logo} 
                                        alt="Logo" 
                                        width={isScrolled ? 180 : 200} 
                                        height={isScrolled ? 60 : 80} 
                                        className='object-contain transition-all duration-300'
                                    />
                                </Link>
                            </div>

                            {/* Menú hamburguesa */}
                            <button 
                                className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                            </button>

                            {/* Buscador - Ocultar en móvil cuando el menú está abierto */}
                            <div className={`hidden md:block flex-1 max-w-2xl mx-8`}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Encuentra tus Productos"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>

                            {/* Carrito y Usuario */}
                            <div className="hidden md:flex items-center space-x-4">
                            {user ? (
    <div className="relative group">
        <button className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors cursor-pointer">
            <FaUser className="text-xl" />
            <span className="font-medium">{user.nombre}</span>
        </button>
        <div className="absolute right-0 w-64 mt-2 bg-white rounded-lg shadow-xl hidden group-hover:block">
            <div className="p-4 border-b">
                <p className="text-gray-900 font-medium">{`${user.nombre} ${user.apellidos}`}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-500 text-xs mt-1 capitalize">{user.rol}</p>
            </div>
            <div className="p-2">
                <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                >
                    Cerrar Sesión
                </button>
            </div>
            {user && user.rol === 'admin' && (
    <div className="p-2">
        <Link 
            href="/admin"
            className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 rounded-md transition-colors block"
        >
            Panel de Administración
        </Link>
    </div>
)}
        </div>
    </div>
) : ( 
    <button
        onClick={() => setIsLoginModalOpen(true)}
        className="text-white hover:text-orange-500 transition-colors"
    >
        <FaUser className="text-xl cursor-pointer" />
    </button>
)}

                                    <button
                                        onClick={() => setIsOffersOpen(!isOffersOpen)}
                                        className="text-white hover:text-orange-500 transition-colors cursor-pointer"
                                    >
                                    </button>
                                    <Cart />
                                </div>
                        </div>
                    </div>
                </div>

                {/* Menú móvil */}
                <div className={`mobile-menu md:hidden fixed inset-0 bg-[#255270] z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="h-full overflow-y-auto">
                        {/* Encabezado del menú móvil */}
                        <div className="sticky top-0 bg-[#255270] z-10 p-4 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center">
                                <Image 
                                    src={logo} 
                                    alt="Logo" 
                                    width={120} 
                                    height={40} 
                                    className='object-contain'
                                />
                            </div>
                            <button 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Cerrar menú"
                            >
                                <FaTimes className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Buscador móvil */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
                                />
                                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500">
                                    <FaSearch />
                                </button>
                            </div>

                            {/* Enlaces principales */}
                            <div className="space-y-2">
                                <Link href="/" className="block text-white hover:text-orange-500 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                                    Inicio
                                </Link>
                                <Link href="/nosotros" className="block text-white hover:text-orange-500 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                                    Nosotros
                                </Link>
                                <Link href="/tienda" className="block text-white hover:text-orange-500 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                                    Tienda
                                </Link>
                                <Link href="/contacto" className="block text-white hover:text-orange-500 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                                    Contacto
                                </Link>
                                <Link href="/faq" className="block text-white hover:text-orange-500 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                                    FAQ
                                </Link>
                                <Link href="/blog" className="block text-white hover:text-orange-500 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                                    Blog
                                </Link>
                            </div>

                            {/* Ofertas móvil */}
                            <button 
                                onClick={() => setIsOffersOpen(!isOffersOpen)}
                                className="w-full flex items-center justify-between text-white hover:text-orange-500 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <span>¡Top Ofertas!</span>
                                <FaTag className="w-4 h-4 cursor-pointer" />
                            </button>

                            {/* Redes sociales móvil meter dentro del div de abajo*/}
                            {/*<Link href="https://www.instagram.com/compactepp/" target="_blank" className="text-white hover:text-orange-500 transition-colors">
                                    <FaInstagram className="w-6 h-6" />
                                </Link>
                                <Link href="https://www.facebook.com/compactseguridad" target="_blank" className="text-white hover:text-orange-500 transition-colors">
                                    <FaFacebook className="w-6 h-6" />
                                </Link>
                                <Link href="https://www.youtube.com/@Compactepp" target="_blank" className="text-white hover:text-orange-500 transition-colors">
                                    <FaYoutube className="w-6 h-6" />
                                </Link> */}
                            <div className="flex items-center justify-center space-x-6 pt-4">
                                {user ? (
                                    <div className="text-white">
                                        <div className="text-center mb-2">{`${user.nombre} ${user.apellidos}`}</div>
                                        <button 
                                            onClick={handleLogout}
                                            className="text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => setIsLoginModalOpen(true)}
                                        className='text-white hover:text-orange-500 transition-colors'
                                    >
                                        <FaUser className='w-5 h-5' />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barra de navegación naranja - Solo visible en desktop */}
                <nav className="bg-orange-500 hidden md:block">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-12">
                            <div className="flex items-center space-x-8">
                                <Link href="/" className="text-white hover:text-gray-200 font-medium px-3 py-2">
                                    Inicio
                                </Link>
                                <Link href="/nosotros" className="text-white hover:text-gray-200 font-medium px-3 py-2">
                                    Nosotros
                                </Link>
                                <Link href="/tienda" className="text-white hover:text-gray-200 font-medium px-3 py-2">
                                    Tienda
                                </Link>
                                <Link href="/contacto" className="text-white hover:text-gray-200 font-medium px-3 py-2">
                                    Contacto
                                </Link>
                                <Link href="/faq" className="text-white hover:text-gray-200 font-medium px-3 py-2">
                                    FAQ
                                </Link>
                                <Link href="/blog" className="text-white hover:text-gray-200 font-medium px-3 py-2">
                                    Blog
                                </Link>
                            </div>
                            <button 
                                onClick={() => setIsOffersOpen(!isOffersOpen)}
                                className="text-white hover:text-gray-200 font-medium px-3 py-2 flex items-center space-x-2"
                            >
                                <FaTag className="text-sm cursor-pointer" />
                                <span className='cursor-pointer'>¡Top Ofertas!</span>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Panel de ofertas */}
                <div className={`fixed top-0 right-0 w-full md:w-80 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOffersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Ofertas del día</h2>
                            <button 
                                onClick={() => setIsOffersOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative w-full h-48">
                                    <Image 
                                        src={logo2} 
                                        alt="Producto en oferta" 
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800">Casco de seguridad</h3>
                                    <div className="flex items-center text-yellow-500">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStarHalfAlt />
                                        <span className="ml-2 text-sm text-gray-600">(4.5)</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-orange-500">S/ 89.90</span>
                                            <span className="text-sm text-gray-500 line-through">S/ 129.90</span>
                                        </div>
                                        <span className="text-sm font-semibold text-green-600">-30%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm text-center">Próximamente: Más productos en oferta</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Login Modal */}
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)}
                onOpenRegister={handleOpenRegister}
                onOpenForgotPassword={handleOpenForgotPassword}
            />

            {/* Register Modal */}
            <RegisterModal 
                isOpen={isRegisterModalOpen} 
                onClose={() => setIsRegisterModalOpen(false)}
                onOpenLogin={handleOpenLogin}
            />

            {/* Forgot Password Modal */}
            <ForgotPasswordModal
                isOpen={isForgotPasswordModalOpen}
                onClose={handleCloseForgotPassword}
                onOpenLogin={handleOpenLogin}
            />

            {/* Spacer div to prevent content from being hidden under the navbar */}
            <div className={`h-[20px] md:h-[122px] transition-all duration-300 ${isScrolled ? 'md:h-[104px]' : ''}`}></div>
        </>
    );
};

export default Navbar;