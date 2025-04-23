'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DM_Sans } from 'next/font/google';
import Image from 'next/image';
import logo from '../app/favicon.ico';
import { FaSearch, FaHome } from 'react-icons/fa';

const DMSans = DM_Sans({ weight: ['400', '500', '700'], subsets: ['latin'] });

const NotFound = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tienda?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 ${DMSans.className}`}>
      <div className="w-full max-w-lg text-center px-6 animate-fade-in">
        <Image
          src={logo}
          alt="Logo Compact Seguridad"
          width={120}
          height={80}
          className="mx-auto mb-6 hover:scale-105 transition-transform duration-300"
          priority
        />
        <h1 className="text-6xl md:text-7xl font-extrabold text-orange-500 drop-shadow-sm mb-2 animate-bounce">404</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Página no encontrada</h2>
        

        <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className=" cursor-pointer flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
          >
            <FaHome className="w-5 h-5" />
            Volver al inicio
          </button>
          <button
            onClick={() => router.push('/tienda')}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out border border-gray-300"
          >
            <FaSearch className="w-5 h-5" />
            Ir a Tienda
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
