'use client';
//Componente para la descarga del catalogo digital
import { motion } from 'framer-motion';
import logo2 from '../assets/Catalogo/Portada.jpeg';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';
import { useState } from 'react';
import { 
    FiDownload, 
    FiSmartphone, 
    FiRefreshCw, 
    FiFileText,
    FiDownloadCloud,
    FiFile,
    FiMonitor
} from 'react-icons/fi';

const DMSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
});

const DownloadCatalog = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí voy a implementar la lógica de envío del formulario
        // y la descarga del catálogo jeje
        console.log('Form submitted:', formData);
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
                                className="bg-orange-500 text-white px-8 py-4 rounded-xl font-medium text-lg
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
                                <h3 className="text-2xl font-bold mb-6">Completa tus datos</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Nombre completo</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                                                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="w-full bg-orange-500 text-white px-8 py-4 rounded-xl font-medium
                                                 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50
                                                 flex items-center justify-center gap-3 cursor-pointer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span>Descargar Ahora</span>
                                        <FiDownloadCloud className="w-6 h-6" />
                                    </motion.button>
                                </form>
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
                                            <span>PDF - 15MB</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiMonitor className="w-5 h-5" />
                                            <span>Optimizado</span>
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