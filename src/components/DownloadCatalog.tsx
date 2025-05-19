'use client';
//Componente para la descarga del catalogo digital
import { motion } from 'framer-motion';
import logo2 from '../assets/Catalogo/Portada.jpeg';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { 
    FiDownload, 
    FiSmartphone, 
    FiRefreshCw, 
    FiFileText,
    FiDownloadCloud,
    FiFile,
    FiMonitor,
    FiCheck,
    FiAlertCircle
} from 'react-icons/fi';

const DMSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
});

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_d9jcaja'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_4b7ax9s'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'ACXpNTunVszEfJY5e'; // Replace with your EmailJS public key

// Catalog PDF URL
const CATALOG_PDF_URL = 'https://drive.google.com/file/d/19KSyJ7haaRmaifYEGj2iHwmThkhohu2A/view?usp=drive_link';

const DownloadCatalog = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    // Inside your handleSubmit function, update the templateParams object:
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
    
        try {
            // Make sure email is not empty
            if (!formData.email.trim()) {
                throw new Error('El correo electrónico es obligatorio');
            }
    
            // Prepare template parameters - ensure all required fields are included
            const templateParams = {
                to_name: formData.name,
                to_email: formData.email,
                from_name: 'Compact Seguridad',
                company: formData.company || 'No especificada',
                reply_to: formData.email,
                message: `Solicitud de catálogo de ${formData.name} (${formData.email})`,
                email: formData.email, // Add this line - some templates use 'email' instead of 'to_email'
                name: formData.name,   // Add this line - some templates use 'name' instead of 'to_name'
                catalog_url: CATALOG_PDF_URL
            };
    
            // Send email using EmailJS
            const result = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );
    
            console.log('Email sent successfully:', result.text);
            setSubmitSuccess(true);
            
            // Trigger download after successful email
            setTimeout(() => {
                window.open(CATALOG_PDF_URL, '_blank');
            }, 1000);
            
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitError(error instanceof Error ? error.message : 'Hubo un problema al enviar el correo. Por favor, inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            company: ''
        });
        setSubmitSuccess(false);
        setSubmitError('');
    };

    return (
        <section className={`w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24 ${DMSans.className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold mb-6 leading-tight">
                                Descarga Nuestro
                                <span className="block text-orange-500">Catálogo Digital {new Date().getFullYear()}</span>
                            </h2>
                            <p className="text-gray-300 text-lg">
                                Accede a nuestra completa gama de productos de seguridad industrial 
                                y equipamiento profesional en un solo documento.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                    <FiSmartphone className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Acceso Multiplataforma</h3>
                                    <p className="text-gray-400">Compatible con todos tus dispositivos</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                    <FiRefreshCw className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Siempre Actualizado</h3>
                                    <p className="text-gray-400">Precios y especificaciones al día</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                    <FiFileText className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Fichas Técnicas</h3>
                                    <p className="text-gray-400">Información detallada de cada producto</p>
                                </div>
                            </div>
                        </div>

                        {!showForm && (
                            <motion.button
                                onClick={() => setShowForm(true)}
                                className="cursor-pointer bg-orange-500 text-white px-8 py-4 rounded-xl font-medium text-lg
                                         shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50
                                         flex items-center gap-3"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Descargar Catálogo</span>
                                <FiDownload className="w-6 h-6" />
                            </motion.button>
                        )}
                    </div>

                    {/* Contenido derecho */}
                    <div className="relative">
                        {showForm ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
                            >
                                {submitSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                            <FiCheck className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">¡Gracias por tu interés!</h3>
                                        <p className="text-gray-300 mb-8">
                                            Tu catálogo se está descargando automáticamente. 
                                            También hemos enviado una copia a tu correo electrónico.
                                        </p>
                                        <motion.button
                                            onClick={() => {
                                                resetForm();
                                                setShowForm(false);
                                            }}
                                            className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium
                                                    transition-colors flex items-center justify-center gap-2 mx-auto"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span>Volver</span>
                                        </motion.button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-2xl font-bold mb-6">Completa tus datos</h3>
                                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Nombre completo</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                                                            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Correo electrónico</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                                                            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Empresa</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                                                            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            
                                            {submitError && (
                                                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
                                                    <FiAlertCircle className="text-red-500 flex-shrink-0" />
                                                    <p className="text-sm text-red-200">{submitError}</p>
                                                </div>
                                            )}
                                            
                                            <div className="flex gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowForm(false)}
                                                    className="cursor-pointer px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-colors"
                                                    disabled={isSubmitting}
                                                >
                                                    Cancelar
                                                </button>
                                                <motion.button
                                                    type="submit"
                                                    className="flex-1 bg-orange-500 text-white px-8 py-4 rounded-xl font-medium
                                                            shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50
                                                            flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70"
                                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <span>Procesando...</span>
                                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Descargar Ahora</span>
                                                            <FiDownloadCloud className="w-6 h-6" />
                                                        </>
                                                    )}
                                                </motion.button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                animate={{
                                    rotate: isHovered ? 2 : 0,
                                    scale: isHovered ? 1.02 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={logo2}
                                    alt="Catálogo Digital Preview"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <FiFile className="w-5 h-5" />
                                            <span>PDF</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiDownloadCloud className="w-5 h-5" />
                                            <span>Descarga Gratuita</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadCatalog;