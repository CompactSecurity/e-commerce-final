"use client";

import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DMSans = DM_Sans({
    weight: ["900", "800", "700", "600"],
    subsets: ["latin"],
});

const faqs = [
    {
        question: "¿Cómo puedo realizar una compra?",
        answer: "Para realizar una compra, simplemente navega por nuestra tienda, selecciona el producto que deseas adquirir y sigue las instrucciones para completar el proceso de compra."
    },
    {
        question: "¿Cuantos dias se tarda en recibir el producto?",
        answer: "Los productos se envian en un plazo de 24 horas, dependiendo del metodo de pago."
    },
    {
        question: "¿Los pagos son seguros?",
        answer: "Sí, utilizamos encriptación de última generación y realizamos copias de seguridad diarias. Cumplimos con los estándares de seguridad más altos y regulaciones de protección de datos."
    },
    {
        question: "¿Cual es el precio de envio?",
        answer: "El precio de envio es de S/. 50, para envios a todo el Perú."
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos todas las tarjetas de crédito principales, transferencias bancarias, PayPal, Plin, Yape, PagoFacil, etc."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const WhatsAppButton = () => {
        const phoneNumber = '51976687566';
        const message = '¡Hola! Tengo una pregunta sobre su empresa.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        return (
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold hover:cursor-pointer" onClick={() => window.open(url,'_blank')}>
                Contactar Soporte                    
            </button>
        );
    };
    return (
        <section className={`py-20 bg-gray-50 ${DMSans.className}`} id="faq">
            <div className="max-w-[1400px] mx-auto px-8">
                {/* Encabezado */}
                <motion.div 
                    className="text-center mb-16 mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
                    </p>
                </motion.div>

                {/* Lista de FAQs */}
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="mb-4"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="cursor-pointer w-full bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between text-left"
                            >
                                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                                <IoIosArrowDown 
                                    className={`text-2xl text-gray-500 transition-transform duration-300 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <motion.div
                                initial={false}
                                animate={{
                                    height: openIndex === index ? "auto" : 0,
                                    opacity: openIndex === index ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-white p-6 rounded-b-xl shadow-sm">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Sección de contacto */}
                <motion.div 
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        ¿No encontraste lo que buscabas?
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Nuestro equipo de soporte está aquí para ayudarte. Contáctanos y te responderemos en menos de 24 horas.
                    </p>
                   {/*Envia un mensaje a WhatsApp */}
                    <WhatsAppButton />
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ; 