'use client';
//Componente de registro
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import logo from '../assets/logo.png';
import Image from 'next/image';


interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onOpenLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: '',
        telefono: '',
        aceptaTerminos: false
    });
    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: '',
        telefono: '',
        aceptaTerminos: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Limpiar errores si el campo cambia
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
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            confirmPassword: '',
            telefono: '',
            aceptaTerminos: ''
        };

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
            isValid = false;
        }

        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es requerido';
            isValid = false;
        }

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

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
            isValid = false;
        }

        if (!formData.telefono.trim()) {
            newErrors.telefono = 'El teléfono es requerido';
            isValid = false;
        }

        if (!formData.aceptaTerminos) {
            newErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost/e-commerce/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: formData.nombre,
                        apellidos: formData.apellido,
                        email: formData.email,
                        password: formData.password,
                        telefono: formData.telefono
                    }),
                });

                const data = await response.json();

                if (data.status === 'success') {
                    onClose();
                    onOpenLogin();
                } else {
                    setErrors(prev => ({
                        ...prev,
                        email: data.mensaje
                    }));
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const modalVariants = {
        open: { opacity: 1 },
        closed: { opacity: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    className="fixed inset-0 z-50 overflow-y-auto"
                >
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        variants={modalVariants}
                        className="fixed inset-0 flex items-center justify-center p-4"
                    >
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
                                    Crear Cuenta
                                </h2>

                                {/* Formulario */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.nombre && (
                                                <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                                                Apellido
                                            </label>
                                            <input
                                                type="text"
                                                id="apellido"
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                                    errors.apellido ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.apellido && (
                                                <p className="mt-1 text-sm text-red-500">{errors.apellido}</p>
                                            )}
                                        </div>
                                    </div>

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
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            id="telefono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                                errors.telefono ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.telefono && (
                                            <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>
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

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirmar Contraseña
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                                        )}
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="aceptaTerminos"
                                                name="aceptaTerminos"
                                                type="checkbox"
                                                checked={formData.aceptaTerminos}
                                                onChange={handleChange}
                                                className="cursor-pointer h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="aceptaTerminos" className="text-gray-700 cursor-pointer">
                                                Acepto los{' '}
                                                <Link href="/terminos" className="text-orange-500 hover:text-orange-600">
                                                    términos y condiciones
                                                </Link>
                                            </label>
                                            {errors.aceptaTerminos && (
                                                <p className="mt-1 text-red-500">{errors.aceptaTerminos}</p>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600
                                        transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
                                    >
                                        Crear Cuenta
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
                                                Tus datos están seguros con nosotros
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Enlace de login */}
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        ¿Ya tienes una cuenta?{' '}
                                        <button
                                            onClick={onOpenLogin}
                                            className="font-medium text-orange-500 hover:text-orange-600 cursor-pointer"
                                        >
                                            Inicia Sesión
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RegisterModal;