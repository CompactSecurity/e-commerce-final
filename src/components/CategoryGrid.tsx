'use client'
//Seccion de categorias de productos
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import audio from '../assets/Categorias/audio.jpg';
import respiratorio from '../assets/Categorias/respiratorio.jpg';
import pies from '../assets/Categorias/pies.jpg';
import manos from '../assets/Categorias/manos.jpg';
import facial from '../assets/Categorias/facial.jpg';
import caidas from '../assets/Categorias/caida.jpg';
import ropa from '../assets/Categorias/ropa.jpg';
import cabeza from '../assets/Categorias/cabeza.jpg';
import visual from '../assets/Categorias/visual.jpg';
const categories = [
    {
        id: 1,
        name: 'Protección para la Cabeza',
        image: cabeza,
        href: '/categoria/proteccion-cabeza',
        description: 'Cascos y accesorios para la cabeza'
    },
    {
        id: 2,
        name: 'Protección Auditiva',
        image: audio,
        href: '/categoria/proteccion-auditiva',
        description: 'Protectores auditivos y tapones'
    },
    {
        id: 3,
        name: 'Protección Respiratoria',
        image: respiratorio,
        href: '/categoria/proteccion-respiratoria',
        description: 'Mascarillas y respiradores'
    },
    {
        id: 4,
        name: 'Protección para Manos',
        image: manos,
        href: '/categoria/proteccion-manos',
        description: 'Guantes de seguridad y protección'
    },
    {
        id: 5,
        name: 'Protección para Pies',
        image: pies,
        href: '/categoria/proteccion-pies',
        description: 'Calzado de seguridad industrial'
    },
    {
        id: 6,
        name: 'Protección Facial',
        image: facial,
        href: '/categoria/proteccion-facial',
        description: 'Caretas y gafas de protección'
    },
    {
        id: 7,
        name: 'Protección para Caídas',
        image: caidas,
        href: '/categoria/proteccion-caidas',
        description: 'Arneses y equipos anti-caídas'
    },
    {
        id: 8,
        name: 'Ropa Industrial',
        image: ropa,
        href: '/categoria/ropa-industrial',
        description: 'Ropa de trabajo y protección'
    },
    {
        id: 9,
        name: 'Proteccion Visual',
        image: visual,
        href: '/categoria/proteccion-visual',
        description: 'Protección visual para la seguridad'
    }

];

const CategoryGrid = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const itemsPerPage = 4;

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) => 
            prevIndex + itemsPerPage >= categories.length ? 0 : prevIndex + itemsPerPage
        );
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => 
            prevIndex - itemsPerPage < 0 ? categories.length - itemsPerPage : prevIndex - itemsPerPage
        );
    };

    const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <section className="py-8 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-16">
                    <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4 text-center"
                    >
                        ¿Qué tipo de Implemento de Seguridad estás buscando?
                    </motion.h3>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto text-center"
                    >
                        Encuentra el equipo de protección que necesitas para tu seguridad laboral
                    </motion.p>
                </div>

                <div className="relative">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                        aria-label="Previous slide"
                    >
                        <FaArrowLeft className="text-gray-600 w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        <AnimatePresence mode="wait" custom={direction}>
                            {visibleCategories.map((category) => (
                                <motion.div
                                    key={category.id}
                                    custom={direction}
                                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction < 0 ? 100 : -100 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link href={category.href}>
                                        <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                            <div className="relative h-40 md:h-56 w-full">
                                                <Image
                                                    src={category.image}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                    priority
                                                />
                                            </div>
                                            <div className="p-4 md:p-6">
                                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 line-clamp-2">
                                                    {category.name}
                                                </h3>
                                                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4 line-clamp-2">
                                                    {category.description}
                                                </p>
                                                <div className="flex items-center text-orange-500">
                                                    <span className="text-xs md:text-sm font-medium">Ver productos</span>
                                                    <FaArrowRight className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                        aria-label="Next slide"
                    >
                        <FaArrowRight className="text-gray-600 w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid; 