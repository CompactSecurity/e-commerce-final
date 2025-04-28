'use client'
//Componente de la Navbar
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.jpg';
import Image from 'next/image';
// Add FaShoppingCart to your imports
import { FaPhone, FaUser, FaEnvelope, FaInstagram, FaFacebook, FaYoutube, FaSearch, FaBars, FaTag, FaStar, FaStarHalfAlt, FaTimes, FaShoppingCart } from 'react-icons/fa';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useCart } from '@/context/CartContext';

// Definimos la interfaz User
interface User {
    id_usuario: number;
    nombre: string;
    apellidos: string;
    email: string;
    rol: string;
}

// Add this interface near the top with other interfaces
interface OfferProduct {
    id_producto: number;
    nombre: string;
    precio: number;
    precio_oferta: number;
    imagen_principal: string;
    slug: string;
}

const Navbar = () => {
    const { itemsCount } = useCart();
    const [isOffersOpen, setIsOffersOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [offerProducts, setOfferProducts] = useState<OfferProduct[]>([]);

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

    useEffect(() => {
        const fetchOfferProducts = async () => {
            try {
                const response = await fetch('http://localhost/e-commerce/api/productos/ofertas/random');
                const data = await response.json();
                if (data.status === 'success') {
                    setOfferProducts(data.data || []);
                }
            } catch (error) {
                console.error('Error fetching offer products:', error);
            }
        };
    
        if (isOffersOpen) {
            fetchOfferProducts();
        }
    }, [isOffersOpen]);
    

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
                                <span
                                    className='text-white hover:text-orange-500 transition-colors cursor-pointer'
                                >976 687 566</span>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-orange-500 mr-2" />
                                <span
                                    onClick={() => window.location.href = 'mailto:compact.estudios@gmail.com'}
                                    className="text-white hover:text-orange-500 transition-colors cursor-pointer"
                                >compact.estudios@gmail.com</span>
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
                                
                                {/* Add Cart Link */}
                                <Link 
                                    href="/cart" 
                                    className="relative text-white hover:text-orange-500 transition-colors"
                                >
                                    <FaShoppingCart className="text-xl" />
                                    {itemsCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {itemsCount}
                                        </span>
                                    )}
                                </Link>
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
                                className="cursor-pointer w-full flex items-center justify-between text-white hover:text-orange-500 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <span className='cursor-pointer' >¡Top Ofertas!</span>
                                <FaTag className="w-4 h-4 cursor-pointer" />
                            </button>
                            <div className="flex items-center justify-center space-x-6 pt-4">
                                {/* Carrito de compras dentro del menu de movil */}
                                <Link 
                                    href="/cart" 
                                    className="relative text-white hover:text-orange-500 transition-colors"
                                >
                                    <FaShoppingCart className="w-5 h-5" />
                                    {itemsCount > 0 && (
                                        <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                            {itemsCount}
                                        </span>
                                    )}
                                </Link>
                                
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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-8">
                                <Link href="/" className="text-white hover:text-white/80 py-3 transition-colors">
                                    Inicio
                                </Link>
                                <Link href="/nosotros" className="text-white hover:text-white/80 py-3 transition-colors">
                                    Nosotros
                                </Link>
                                <Link href="/tienda" className="text-white hover:text-white/80 py-3 transition-colors">
                                    Tienda
                                </Link>
                                <Link href="/contacto" className="text-white hover:text-white/80 py-3 transition-colors">
                                    Contacto
                                </Link>
                                <Link href="/faq" className="text-white hover:text-white/80 py-3 transition-colors">
                                    FAQ
                                </Link>
                                <Link href="/blog" className="text-white hover:text-white/80 py-3 transition-colors">
                                    Blog
                                </Link>
                            </div>
                            <button
                                onClick={() => setIsOffersOpen(true)}
                                className="cursor-pointer flex items-center space-x-2 text-white hover:text-white/80 py-3 transition-colors"
                            >
                                <FaTag className="w-4 h-4 cursor-pointer" />
                                <span>¡Top Ofertas!</span>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Panel de ofertas */}
                <div
                    className={`fixed top-0 right-0 w-full md:w-96 h-screen bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isOffersOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="h-full flex flex-col overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 z-10 p-4 flex items-center justify-between shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
                                ¡Nuestras ofertas de Hoy!
                            </h2>
                            <button
                                onClick={() => setIsOffersOpen(false)}
                                className="cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                            >
                                <FaTimes className="cursor-pointer w-5 h-5" />
                            </button>
                        </div>

                        {/* Lista de productos en oferta */}
                        <div className="p-4 flex-grow overflow-y-auto">
                            {offerProducts.length > 0 ? (
                                <ul className="space-y-2">
                                    {offerProducts.map((product) => (
                                        <li
                                            key={product.id_producto}
                                            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                            <Link
                                                href={`/productos/${product.slug}`}
                                                className="block p-4 flex items-center gap-4"
                                                onClick={() => setIsOffersOpen(false)}
                                            >
                                                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                                                    <Image
                                                        src={product.imagen_principal}
                                                        alt={product.nombre}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-medium text-gray-800 truncate">
                                                        {product.nombre}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-lg font-semibold text-orange-500">
                                                            S/ {product.precio.toFixed(2)}
                                                        </span>

                                                        <span className="text-sm text-gray-500 line-through">
                                                            S/ {product.precio_oferta.toFixed(2)}
                                                        </span>
                                                    </div>
                                                    {product.precio_oferta > 0 && (
                                                        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold rounded-full px-2 py-1 mt-1">
                                                            ¡Ahorras S/ {(product.precio_oferta - product.precio).toFixed(2)}!
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <p className="text-gray-500 text-sm">
                                        ¡Lo sentimos! No hay ofertas especiales por ahora.
                                    </p>
                                </div>
                            )}
                        </div>

    {/* Button */}
    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-sm">
      <Link
        href="/tienda"
        className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md text-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
        onClick={() => setIsOffersOpen(false)}
      >
        Ir a la Tienda
      </Link>
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