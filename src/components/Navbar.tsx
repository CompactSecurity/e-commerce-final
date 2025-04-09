'use client'
//Componente de la Navbar
import React, { useState } from 'react';
import Link from 'next/link';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.jpg';
import Image from 'next/image';
import { FaPhone, FaUser, FaEnvelope, FaInstagram, FaFacebook, FaYoutube, FaSearch, FaBars, FaTag, FaStar, FaStarHalfAlt, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isOffersOpen, setIsOffersOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const categories = [
        { name: 'BLOQUEO Y ETIQUETADO', href: '/categoria/bloqueo-etiquetado' },
        { name: 'CONTROL DE DERRAMES', href: '/categoria/control-derrames' },
        { name: 'EQUIPOS DE SEGURIDAD ELECTRICA', href: '/categoria/seguridad-electrica' },
        { name: 'ESCALERAS', href: '/categoria/escaleras' },
        { name: 'LINTERNAS', href: '/categoria/linternas' },
        { name: 'PROTECCION AUDITIVA', href: '/categoria/proteccion-auditiva' },
        { name: 'PROTECCION FACIAL', href: '/categoria/proteccion-facial' },
        { name: 'PROTECCION PARA CAIDAS', href: '/categoria/proteccion-caidas' },
        { name: 'PROTECCIÓN PARA LA CABEZA', href: '/categoria/proteccion-cabeza' },
        { name: 'PROTECCIÓN PARA MANOS', href: '/categoria/proteccion-manos' },
        { name: 'PROTECCION PARA PIES', href: '/categoria/proteccion-pies' },
        { name: 'PROTECCION RESPIRATORIA', href: '/categoria/proteccion-respiratoria' },
        { name: 'ROPA INDUSTRIAL', href: '/categoria/ropa-industrial' },
        { name: 'SEÑALIZACIÓN Y SEGURIDAD VIAL', href: '/categoria/senalizacion' },
    ];

    return (
        <>
            <header className="fixed w-full top-0 left-0 right-0 z-50">
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
                <div className="bg-[#255270] shadow-md py-3">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-20 gap-4">
                            {/* Logo y menú hamburguesa */}
                            <div className="flex items-center justify-between w-full md:w-auto">
                                <Link href="/" className="flex-shrink-0">
                                    <Image src={logo} alt="Logo" width={200} height={150} className='object-contain' />
                                </Link>
                                <button 
                                    className="md:hidden text-white text-2xl"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                                </button>
                            </div>

                            {/* Buscador - Ocultar en móvil cuando el menú está abierto */}
                            <div className={`w-full md:w-auto md:flex-1 max-w-2xl mx-0 md:mx-8 ${isMobileMenuOpen ? 'hidden' : 'block'}`}>
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

                            {/* Carrito y Usuario - Ocultar en móvil cuando el menú está abierto */}
                            <div className={`flex items-center ${isMobileMenuOpen ? 'hidden' : 'flex'}`}>
                                <Link href='/login' className='text-white relative text-gray-600 hover:text-orange-500'>
                                    <button className='cursor-pointer text-white px-2 py-2 space-x-2 rounded-md'>
                                        <FaUser className='text-2xl'/>
                                    </button>
                                </Link>
                                <span className='text-white mx-2'>
                                    |
                                </span>
                                <Link href="/carrito" className="relative p-2 text-white hover:text-orange-500">
                                    <span className="text-2xl">🛒</span>
                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        0
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menú móvil */}
                <div className={`md:hidden bg-[#255270] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <div className="px-4 py-2 space-y-2">
                        <Link href="/" className="block text-white hover:text-orange-500 py-2">
                            Inicio
                        </Link>
                        <Link href="/nosotros" className="block text-white hover:text-orange-500 py-2">
                            Nosotros
                        </Link>
                        <Link href="/tienda" className="block text-white hover:text-orange-500 py-2">
                            Tienda
                        </Link>
                        <Link href="/contacto" className="block text-white hover:text-orange-500 py-2">
                            Contacto
                        </Link>
                        <Link href="/faq" className="block text-white hover:text-orange-500 py-2">
                            FAQ
                        </Link>
                        <Link href="/blog" className="block text-white hover:text-orange-500 py-2">
                            Blog
                        </Link>
                        <button 
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="w-full text-left text-white hover:text-orange-500 py-2 flex items-center"
                        >
                            <FaBars className="mr-2" />
                            Categorías
                        </button>
                        {isCategoryOpen && (
                            <div className="pl-4 space-y-2">
                                {categories.map((category) => (
                                    <Link
                                        key={category.href}
                                        href={category.href}
                                        className="block text-white hover:text-orange-500 py-1"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <button 
                            onClick={() => setIsOffersOpen(!isOffersOpen)}
                            className="w-full text-left text-white hover:text-orange-500 py-2 flex items-center"
                        >
                            <FaTag className="mr-2" />
                            ¡Top Ofertas!
                        </button>
                    </div>
                </div>

                {/* Barra de navegación naranja - Solo visible en desktop */}
                <nav className="bg-orange-500 hidden md:block">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-12">
                            <div className="flex items-center space-x-8">
                                <div className="relative group">
                                    <button 
                                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                        className="text-white hover:text-gray-200 font-medium px-3 py-2 flex items-center space-x-1"
                                    >
                                        <FaBars className="text-sm" />
                                        <span>Categorías</span>
                                    </button>
                                    <div className={`absolute left-0 w-72 bg-white shadow-lg z-50 ${isCategoryOpen ? 'block' : 'hidden'}`}>
                                        {categories.map((category) => (
                                            <Link
                                                key={category.href}
                                                href={category.href}
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
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
                                <FaTag className="text-sm" />
                                <span>¡Top Ofertas!</span>
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
            {/* Spacer div to prevent content from being hidden under the navbar */}
            <div className="h-[122px] md:h-[122px]"></div>
        </>
    );
};

export default Navbar;