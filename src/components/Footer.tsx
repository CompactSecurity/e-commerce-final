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
import { toast } from 'react-hot-toast'; // para la notificacion 

const DMSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
});

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const articleLinks = [
        { name: 'Cascos de seguridad', href: '/tienda' },
        { name: 'Guantes de seguridad', href: '/tienda' },
        { name: 'Lentes de seguridad', href: '/tienda' },
        { name: 'Protección respiratoria', href: '/tienda' },
        { name: 'Zapatos de seguridad', href: '/tienda' },
        { name: 'Protectores auditivos', href: '/tienda' },
    ];

    const productLinks = [
        { name: 'Absorbentes', href: '/tienda' },
        { name: 'Arnés y líneas de vida', href: '/tienda' },
        { name: 'Candados de bloqueo', href: '/tienda' },
        { name: 'Cintas antideslizantes', href: '/tienda' },
        { name: 'Seguridad vial', href: '/tienda' },
        { name: 'Ropa industrial', href: '/tienda' },
    ];
// Funcion para mostrar la notificacion de desarrollo de PetuCode
    const showToast = () => {
        toast.custom(
            (t) => (
                <div
                    className={`${
                        t.visible ? 'animate-fade-in' : 'animate-fade-out'
                    } fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-2xl`}
                >
                    <div className="flex items-center justify-between px-4 py-2 rounded-t-lg bg-[#22C55E]">
                        <div className="flex items-center space-x-2 bg-[#22C55E]">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-white font-medium">PetuCode</span>
                        </div>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="text-white hover:text-indigo-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        <p className="text-gray-800">Desarrollado por <span className="font-semibold">PetuCode</span></p>
                        <p className="text-sm text-gray-500 mt-1">Justo ahora</p>
                    </div>
                </div>
            ),
            {
                duration: 5000,
                position: 'bottom-right',
            }
        );
    };
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
                                    href="https://wa.me/51976687566" target='_blank' 
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiPhone className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm">976 687 566</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="mailto:compact.estudios@gmail.com" 
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
                                    href="https://wa.me/51976687566" target='_blank' 
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
                            <Link 
                                href="https://github.com/PetusoTwo" //Aca voy a cambiar el link por el de mi empresa - PetuCode
                                target="_blank"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                                onClick={showToast}
                            >
                                Desarrollado por PetuCode
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;