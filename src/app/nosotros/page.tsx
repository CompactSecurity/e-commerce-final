'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCheck, FiTarget, FiUsers, FiAward } from 'react-icons/fi';
import { DM_Sans } from 'next/font/google';
import imagee from '../../assets/carrousel1.png';


const DMSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
});
const AboutPage = () => {
    const values = [
        {
            icon: <FiTarget className="w-6 h-6" />,
            title: 'Misión',
            description: 'Proporcionar soluciones integrales de seguridad industrial de la más alta calidad, garantizando la protección y el bienestar de los trabajadores en todo momento.'
        },
        {
            icon: <FiUsers className="w-6 h-6" />,
            title: 'Visión',
            description: 'Ser la empresa líder en el mercado peruano de equipos de protección personal, reconocida por nuestra excelencia, innovación y compromiso con la seguridad laboral.'
        },
        {
            icon: <FiAward className="w-6 h-6" />,
            title: 'Valores',
            description: 'Integridad, excelencia, compromiso con el cliente, innovación y responsabilidad social son los pilares que guían nuestras acciones diarias.'
        }
    ];

    const features = [
        'Más de 10 años de experiencia en el mercado',
        'Productos certificados de alta calidad',
        'Asesoramiento técnico especializado',
        'Entregas rápidas y eficientes',
        'Amplio stock disponible',
        'Soporte post-venta garantizado'
    ];

    return (
            <main className={`min-h-screen bg-gray-900 ${DMSans.className}`}>
                {/* Hero Section */}
                <div className="h-[50px]"></div>
            <section className="relative bg-gray-900 text-white py-24">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent">
                    <Image
                        src={imagee}
                        alt="Compact Seguridad y Construcción"
                        fill
                        className="object-cover opacity-40"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Sobre Nosotros
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl"
                    >
                        Somos una empresa líder en la distribución de equipos de protección industrial,
                        comprometida con la seguridad y el bienestar de los trabajadores peruanos.
                    </motion.p>
                </div>
            </section>

            {/* Seccion de Valores */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-50 p-8 rounded-2xl"
                            >
                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Historia y Características */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Nuestra Historia
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Desde nuestra fundación, nos hemos dedicado a proporcionar soluciones 
                                integrales en seguridad industrial para empresas de todos los sectores. 
                                Nuestra experiencia y compromiso con la calidad nos han permitido 
                                convertirnos en un referente en el mercado peruano.
                            </p>
                            <p className="text-gray-600">
                                Trabajamos con las mejores marcas y mantenemos altos estándares de 
                                calidad en todos nuestros productos y servicios, garantizando la 
                                satisfacción total de nuestros clientes.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-lg"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                ¿Por qué elegirnos?
                            </h3>
                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <FiCheck className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <span className="text-gray-600">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section 
                        <section className="py-16 bg-orange-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-white mb-6"
                    >
                        ¿Listo para mejorar la seguridad de tu empresa?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/90 mb-8 max-w-2xl mx-auto"
                    >
                        Contáctanos hoy mismo y descubre cómo podemos ayudarte a proteger 
                        a tu equipo con los mejores equipos de protección personal.
                    </motion.p>
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        href="/contacto"
                        className="inline-block bg-white text-orange-500 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300"
                    >
                        Contáctanos
                    </motion.a>
                </div>
            </section>
            */}

            </main>
    );
};

export default AboutPage; 