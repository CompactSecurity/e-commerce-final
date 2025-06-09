'use client';
//Componente de los videos del canal de Youtube de la Empresa
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiYoutube, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { DM_Sans } from 'next/font/google';
import Image from 'next/image';

const DMSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
});

// Función para extraer el ID del video de Youtube
const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// Interfaz para los videos
interface Video {
    title: string;
    url: string;
}

const YoutubeSection = () => {
    // Array de videos de ejemplo (reemplazar con los videos reales del canal)
    const videos: Video[] = [
        {
            title: 'Uso correcto de EPP en la industria',
            url: 'https://www.youtube.com/watch?v=QpS1S94Ipds'
        },
        {
            title: 'Seguridad en el trabajo: Mejores prácticas',
            url: 'https://www.youtube.com/watch?v=QpS1S94Ipds'
        },
        {
            title: 'Guía de selección de equipos de protección',
            url: 'https://www.youtube.com/watch?v=QpS1S94Ipds'
        },
        // Agregar más videos según sea necesario
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(false);

    const nextVideo = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        setShowVideo(false);
    };

    const prevVideo = () => {
        setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
        setShowVideo(false);
    };

    const currentVideo = videos[currentVideoIndex];
    const videoId = getYoutubeVideoId(currentVideo.url);

    return (
        <section className={`bg-gray-50 py-16 ${DMSans.className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Encabezado de la sección */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <FiYoutube className="w-6 h-6 text-red-600" />
                        <span className="text-sm font-medium text-red-600 uppercase tracking-wider">
                            Nuestro Canal
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Videos Educativos
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Descubre consejos, tutoriales y mejores prácticas sobre seguridad industrial
                        a través de nuestro contenido en YouTube.
                    </motion.p>
                </div>

                {/* Contenedor principal del video */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="w-full h-[600px] bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                        {showVideo && videoId ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title={currentVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                                style={{ aspectRatio: '16/9' }}
                            />
                        ) : (
                            <div 
                                className="relative w-full h-full cursor-pointer group"
                                onClick={() => setShowVideo(true)}
                            >
                                <Image 
                                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                    alt={currentVideo.title}
                                    width={320}
                                    height={180}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center"
                                    >
                                        <FiYoutube className="w-12 h-12 text-white" />
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Controles de navegación */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevVideo}
                            className="bg-white p-4 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                        >
                            <FiChevronLeft className="w-8 h-8 text-gray-900" />
                        </motion.button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextVideo}
                            className="bg-white p-4 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                        >
                            <FiChevronRight className="w-8 h-8 text-gray-900" />
                        </motion.button>
                    </div>
                </div>


                {/* Botón de suscripción */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <a
                        href="https://www.youtube.com/@Compactepp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                    >
                        <FiYoutube className="w-5 h-5" />
                        Suscríbete a nuestro canal
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default YoutubeSection; 