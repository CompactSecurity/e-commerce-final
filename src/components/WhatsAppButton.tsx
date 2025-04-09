'use client';
//Componente para el boton flotante de WhatsApp
import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    // Número de WhatsApp y mensaje predeterminado
    const phoneNumber = '976687566';
    const message = '¡Hola! Me gustaría obtener más información sobre sus productos. Gracias de antemano.';

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            className="fixed bottom-8 right-8 z-50"
        >
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
                className="bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center group relative"
            >
                <FaWhatsapp className="w-6 h-6" />
                
                {/* Tooltip */}
                <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg 
                    text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity 
                    duration-300 pointer-events-none">
                    Contáctanos por WhatsApp
                </span>

                {/* Efecto de pulso */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
            </motion.button>
        </motion.div>
    );
};

export default WhatsAppButton; 