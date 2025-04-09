'use client';

import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";
import React from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import team1 from "../assets/person01.jpg";

const DMSans = DM_Sans({
    weight: ["900", "800", "700", "600"],
    subsets: ["latin"],
});

const testimonials = [
    {
        name: "Carlos Ramírez",
        position: "Jefe de Seguridad Industrial",
        company: "ConstruReal SAC",
        image: team1,
        testimonial: "Los implementos de seguridad que adquirimos en Compact Seguridad han elevado nuestro estándar de protección. La calidad es excelente y la atención al cliente, impecable."
    },
    {
        name: "Ana Martínez",
        position: "Encargada de Compras",
        company: "Logística Andina",
        image: team1,
        testimonial: "Gracias a Compact Seguridad logramos equipar a todo nuestro personal con EPP certificados y a precios competitivos. Totalmente recomendados."
    },
    {
        name: "Roberto Sánchez",
        position: "Gerente de Planta",
        company: "Industrias Omega",
        image: team1,
        testimonial: "Desde cascos hasta arneses, todo lo conseguimos con ellos. El servicio fue rápido, y los productos cumplen con todas las normas técnicas que requerimos."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const Testimonials: React.FC = () => {
    return (
        <section className={`py-20 bg-gray-50 ${DMSans.className}`} id="testimonios">
            <div className="max-w-[1400px] mx-auto px-8">
                {/* Encabezado */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo que opinan nuestros clientes</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Empresas de todo el país confían en nuestros equipos de protección personal para mantener a sus colaboradores seguros.
                    </p>
                </motion.div>

                {/* Grid de testimonios */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
                        >
                            {/* Icono de cita */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center">
                                <FaQuoteLeft className="text-white text-sm" />
                            </div>

                            {/* Contenido del testimonio */}
                            <div className="mt-4">
                            <p className="text-gray-600 mb-6 italic">
                                &quot;{testimonial.testimonial}&quot;
                            </p>

                                {/* Información del cliente */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                                        <p className="text-sm text-[#22C55E]">{testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
