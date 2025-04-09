'use client';
//Pie de pagina
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.png';
import { 
    FiPhone, 
    FiMail, 
    FiMapPin, 
    FiBook,
    FiFacebook,
    FiInstagram,
    FiYoutube
} from 'react-icons/fi';
import { DM_Sans } from 'next/font/google';

const DMSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
});

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const articleLinks = [
        { name: 'Cascos de seguridad', href: '/articulos/cascos-seguridad' },
        { name: 'Guantes de seguridad', href: '/articulos/guantes-seguridad' },
        { name: 'Lentes de seguridad', href: '/articulos/lentes-seguridad' },
        { name: 'Protección respiratoria', href: '/articulos/proteccion-respiratoria' },
        { name: 'Zapatos de seguridad', href: '/articulos/zapatos-seguridad' },
        { name: 'Protectores auditivos', href: '/articulos/protectores-auditivos' },
    ];

    const productLinks = [
        { name: 'Absorbentes', href: '/productos/absorbentes' },
        { name: 'Arnés y líneas de vida', href: '/productos/arnes-lineas-vida' },
        { name: 'Candados de bloqueo', href: '/productos/candados-bloqueo' },
        { name: 'Cintas antideslizantes', href: '/productos/cintas-antideslizantes' },
        { name: 'Duchas y lavaojos', href: '/productos/duchas-lavaojos' },
        { name: 'Seguridad vial', href: '/productos/seguridad-vial' },
        { name: 'Vestuario laboral', href: '/productos/vestuario-laboral' },
    ];

    return (
        <footer className={`bg-gray-900 text-white ${DMSans.className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Columna 1: Información de la empresa */}
                    <div className="space-y-6">
                        <Link href="/" className="block">
                            <Image
                                src={logo}
                                alt="Compact Seguridad Industrial"
                                width={180}
                                height={60}
                                className="w-auto h-20"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Soluciones integrales para la Industria en general. Proveedor y Distribuidor de EPP, 
                            Venta de Equipos de Protección Personal en Chiclayo, Perú
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com/compactseguridad" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <FiFacebook className="w-5 h-5" />
                            </Link>
                            <Link href="https://instagram.com/compactepp/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <FiInstagram className="w-5 h-5" />
                            </Link>
                            <Link href="https://www.youtube.com/@Compactepp" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <FiYoutube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Columna 2: Artículos EPP */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Artículos EPP</h3>
                        <ul className="space-y-3">
                            {articleLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3: Productos EPP */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Productos EPP</h3>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 4: Información de contacto */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Información de contacto</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    href="https://compactseguridad.com/" 
                                    target="_blank"
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiBook className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm">Compact Seguridad Industrial</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="tel:976687566" 
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiPhone className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm">976 687 566</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="mailto:ventas@compactseguridadindustrial.com" 
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiMail className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm">compact.estudios@gmail.com</span>
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-start gap-3 text-gray-400">
                                    <FiMapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                                    <span className="text-sm">
                                        Av. America N° 316 JLO - Chiclayo, Perú
                                    </span>
                                </div>
                            </li>
                            <li>
                                <Link 
                                    href="tel:976 687 566" 
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiPhone className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm">976 687 566</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © {currentYear} Compact Seguridad Industrial | Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link 
                                href="/politica-privacidad"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Política de Privacidad
                            </Link>
                            <Link 
                                href="/terminos-condiciones"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Términos y Condiciones
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 