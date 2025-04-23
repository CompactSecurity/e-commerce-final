'use client';
//Componente de login
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEye, FaEyeSlash  } from 'react-icons/fa';
import logo from '../assets/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenRegister: () => void;
    onOpenForgotPassword: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onOpenRegister, onOpenForgotPassword }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar el mensaje de error si el campo está válido
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: '',
            password: '',
        };

        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo electrónico no es válido';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost/e-commerce/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    }),
                    credentials: 'include'
                });

                const data = await response.json();
                console.log('Login response:', data); 

                if (data.status === 'success') {
                    localStorage.setItem('user', JSON.stringify(data.data.usuario));
                    onClose();
                    window.location.reload();
                } else {
                    setErrors(prev => ({
                        ...prev,
                        email: data.mensaje,
                        password: data.mensaje
                    }));
                }
            } catch (error) {
                console.error('Error:', error);
                setErrors(prev => ({
                    ...prev,
                    email: 'Error de conexión',
                    password: 'Error de conexión'
                }));
            }
        }
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
                    {/* Fondo con filtro blur*/}
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
                                aria-label="Cerrar modal"
                            >
                                <FaTimes className="w-6 h-6" />
                            </button>

                            {/* Contenido del modal */}
                            <div className="p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                <div className="flex justify-center">
                                        <Image 
                                            src={logo} 
                                            alt="logo" 
                                            width={100} 
                                            height={100} 
                                            className="w-50 h-25 object-contain"
                                        />
                                    </div>
                                    Iniciar Sesión
                                </h2>

                                {/* Formulario */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder=""
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            Contraseña
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder=""
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                                Recordarme
                                            </label>
                                        </div>
                                        <button
                                            onClick={onOpenForgotPassword}
                                            className="text-sm font-medium text-orange-500 hover:text-orange-600"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600
                                        transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
                                    >
                                        Iniciar Sesión
                                    </button>
                                </form>

                                {/* Separador */}
                                <div className="my-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">
                                                Tus datos no seran compartidos con terceros                                                
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Enlace de registro */}
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        ¿No tienes una cuenta?{' '}
                                        <button
                                            onClick={onOpenRegister}
                                            className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
                                        >
                                            Regístrate
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;