import React, { useState } from 'react';
//Componente de olvidaste tu contraseña
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/logo.png';
import Image from 'next/image';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenLogin: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onOpenLogin }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Por favor ingresa tu correo electrónico');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Por favor ingresa un correo electrónico válido');
            return;
        }
        // Aquí iría la lógica para enviar el correo de recuperación
        console.log('Enviando correo de recuperación a:', email);
        setIsSubmitted(true);
    };

    const handleBackToLogin = () => {
        onClose();
        onOpenLogin();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 overflow-y-auto"
                >
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

                    {/* Contenedor del modal */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            {/* Botón de cerrar */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
                            >
                                <FaTimes className="w-6 h-6" />
                            </button>

                            {/* Contenido del modal */}
                            <div className="p-6 md:p-8">
                                <div className="flex justify-center mb-6">
                                    <Image 
                                        src={logo} 
                                        alt="logo" 
                                        width={100} 
                                        height={100} 
                                        className="w-50 h-25 object-contain"
                                    />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                                    Recuperar Contraseña
                                </h2>
                                
                                <p className="text-gray-600 text-center mb-6">
                                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                                </p>

                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Correo Electrónico
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                placeholder="Escribe tu correo electrónico"
                                            />
                                            {error && (
                                                <p className="mt-1 text-sm text-red-500">{error}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600
                                            transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
                                        >
                                            Enviar Enlace
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center space-y-4">
                                        <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                                            <p className="font-medium">
                                                ¡Correo enviado!
                                            </p>
                                            <p className="text-sm mt-1">
                                                Revisa tu bandeja de entrada para restablecer tu contraseña.
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleBackToLogin}
                                            className="cursor-pointer text-orange-500 hover:text-orange-600 font-medium flex items-center justify-center space-x-2"
                                        >
                                            <FaArrowLeft />
                                            <span>Volver al inicio de sesión</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ForgotPasswordModal; 